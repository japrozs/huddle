import { Comment } from "../entities/Comment";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import { Arg, Ctx, Int, Mutation, Query, UseMiddleware } from "type-graphql";

export class CommentResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Comment)
    async createComment(
        @Arg("postId", () => Int) postId: number,
        @Arg("body") body: string,
        @Ctx() { req }: Context
    ) {
        return Comment.create({
            creatorId: req.session.userId,
            postId,
            body,
        }).save();
    }

    @UseMiddleware(isAuth)
    @Query(() => [Comment])
    async getComments(@Arg("id", () => Int!) id: number) {
        return Comment.find({
            where: { postId: id },
            relations: ["creator"],
            order: { createdAt: "DESC" },
        });
    }
}
