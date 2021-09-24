"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const Post_1 = require("../entities/Post");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const Like_1 = require("../entities/Like");
const typeorm_1 = require("typeorm");
let PostResolver = class PostResolver {
    async voteStatus(post, { likeLoader, req }) {
        if (!req.session.userId) {
            return null;
        }
        const like = await likeLoader.load({
            postId: post.id,
            userId: req.session.userId,
        });
        return like ? 1 : null;
    }
    getPosts() {
        return Post_1.Post.find({
            relations: ["creator", "event", "comments"],
            order: { createdAt: "DESC" },
        });
    }
    async createPost(eventId, body, { req }) {
        return Post_1.Post.create({
            creatorId: req.session.userId,
            eventId,
            body,
        }).save();
    }
    async getPost(id) {
        return Post_1.Post.findOne({
            where: { id },
            relations: ["event", "creator", "comments", "comments.creator"],
        });
    }
    async like(postId, { req }) {
        const { userId } = req.session;
        const like = await Like_1.Like.findOne({ where: { userId, postId } });
        if (like) {
            await Like_1.Like.delete({ userId, postId });
            await (0, typeorm_1.getConnection)().query(`
            START TRANSACTION;
            update post
        set likes = likes - 1
        where id = ${postId};

        COMMIT;
            `);
        }
        else {
            await (0, typeorm_1.getConnection)().query(`
        START TRANSACTION;

        insert into "like" ("userId", "postId", "value")
        values (${userId},${postId},1);

        update post
        set likes = likes + 1
        where id = ${postId};

        COMMIT;
        `);
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => type_graphql_1.Int, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "voteStatus", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Post_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "getPosts", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Post_1.Post),
    __param(0, (0, type_graphql_1.Arg)("eventId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("body")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => Post_1.Post),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("postId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "like", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)(Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map