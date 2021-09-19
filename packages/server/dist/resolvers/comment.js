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
exports.CommentResolver = void 0;
const Comment_1 = require("../entities/Comment");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
class CommentResolver {
    async createComment(postId, body, { req }) {
        return Comment_1.Comment.create({
            creatorId: req.session.userId,
            postId,
            body,
        }).save();
    }
    async getComments(id) {
        return Comment_1.Comment.find({
            where: { postId: id },
            relations: ["creator"],
            order: { createdAt: "DESC" },
        });
    }
}
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Comment_1.Comment),
    __param(0, (0, type_graphql_1.Arg)("postId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("body")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Comment_1.Comment]),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getComments", null);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.js.map