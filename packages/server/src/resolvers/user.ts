import { User } from "../entities/User";
import { Context } from "../types";
import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "../schemas/UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection } from "typeorm";
import { imgUrlGenerator } from "../generators/imgUrl";
import { bioGenerator } from "../generators/bio";
import { isAuth } from "../middleware/isAuth";
import { validateProfileUpdate } from "../utils/validateProfileUpdate";

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string,
        @Ctx() { redis, req }: Context
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message: "Length must be greater than 2",
                    },
                ],
            };
        }

        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "Token is expired or invalid!",
                    },
                ],
            };
        }

        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum);
        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User no longer exists",
                    },
                ],
            };
        }

        await User.update(
            { id: userIdNum },
            {
                password: await argon2.hash(newPassword),
            }
        );

        await redis.del(key);

        // log in user after change password
        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() { redis }: Context
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return true;
        }
        const token = v4();
        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            "ex",
            1000 * 60 * 60 * 24 * 3
        ); // 3 days

        await sendEmail(
            user.email,
            `<h1>Change your Lireddit password</h1>
      <h3>
        Click here to <a href="http://localhost:3000/change-password/${token}">reset your password</a>
      </h3>`
        );
        return true;
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: Context) {
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: options.username,
                    password: hashedPassword,
                    email: options.email,
                    name: options.name,
                    bio: bioGenerator(),
                    imgUrl: imgUrlGenerator(options.username),
                })
                .returning("*") // return the output of the sql query
                .execute();
            user = result.raw[0];
        } catch (err) {
            // duplicate username error
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "Username has already been taken",
                        },
                    ],
                };
            }
            console.log("message : ", err.message);
        }
        // store user id session
        // this will set a cookie on the user
        // and keep them logged in
        req.session.userId = user.id;

        return { user };
    }

    @UseMiddleware(isAuth)
    @Mutation(() => UserResponse)
    async updateProfile(
        @Arg("name") name: string,
        @Arg("bio") bio: string,
        @Arg("username") username: string,
        @Ctx() { req }: Context
    ) {
        const user = await User.findOne({ where: { username } });
        if (user && user.id != req.session.userId) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Username is taken",
                    },
                ],
            };
        }

        const errors = validateProfileUpdate({
            name,
            bio,
            username,
        });
        if (errors) {
            return { errors };
        }

        await User.update(
            { id: req.session.userId },
            {
                name,
                bio,
                username,
            }
        );

        const updatedUser = await User.findOne(req.session.userId);

        return { user: updatedUser };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameOrEmail.includes("@")
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } }
        );
        if (!user) {
            return {
                errors: [
                    {
                        field: "usernameOrEmail",
                        message: "That username doesn't exist",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Incorrect password",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean, { nullable: true })
    logout(@Ctx() { req, res }: Context) {
        return new Promise((resolve) =>
            req.session.destroy((err: Error) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        );
    }

    @UseMiddleware(isAuth)
    @Query(() => [User])
    async getAllUsers() {
        return User.find({});
    }

    @UseMiddleware(isAuth)
    @Query(() => User)
    async getUser(@Arg("id", () => Int) id: number) {
        return User.findOne({
            where: { id },
            relations: [
                "events",
                "posts",
                "posts.creator",
                "posts.event",
                "posts.comments",
            ],
        });
    }
}
