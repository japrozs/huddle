import { Post } from "../entities/Post";
import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import { Like } from "../entities/Like";
import { getConnection } from "typeorm";

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => Int, { nullable: true })
    async voteStatus(@Root() post: Post, @Ctx() { likeLoader, req }: Context) {
        if (!req.session.userId) {
            return null;
        }
        const like = await likeLoader.load({
            postId: post.id,
            userId: req.session.userId,
        });

        return like ? 1 : null;
    }

    @Query(() => [Post])
    getPosts() {
        return Post.find({
            relations: ["creator", "event", "comments"],
            order: { createdAt: "DESC" },
        });
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async createPost(
        @Arg("eventId", () => Int) eventId: number,
        @Arg("body") body: string,
        @Ctx() { req }: Context
    ) {
        return Post.create({
            creatorId: req.session.userId,
            eventId,
            body,
        }).save();
    }

    @UseMiddleware(isAuth)
    @Query(() => Post)
    async getPost(@Arg("id", () => Int) id: number) {
        return Post.findOne({
            where: { id },
            relations: ["event", "creator", "comments", "comments.creator"],
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async like(
        @Arg("postId", () => Int) postId: number,
        @Ctx() { req }: Context
    ) {
        const { userId } = req.session;
        const like = await Like.findOne({ where: { userId, postId } });
        if (like) {
            await Like.delete({ userId, postId });
            await getConnection().query(`
            START TRANSACTION;
            update post
        set likes = likes - 1
        where id = ${postId};

        COMMIT;
            `);
        } else {
            await getConnection().query(
                `
        START TRANSACTION;

        insert into "like" ("userId", "postId", "value")
        values (${userId},${postId},1);

        update post
        set likes = likes + 1
        where id = ${postId};

        COMMIT;
        `
            );
        }
        return true;
    }
}
