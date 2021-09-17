import { Post } from "../entities/Post";
import { Arg, Ctx, Int, Mutation, Query, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";

export class PostResolver {
    @Query(() => [Post])
    getPosts() {
        return Post.find({
            relations: ["creator", "event"],
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
}
