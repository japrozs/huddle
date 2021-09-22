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
exports.EventResolver = exports.EventFieldError = void 0;
const Event_1 = require("../entities/Event");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const validateEvent_1 = require("../utils/validateEvent");
let EventFieldError = class EventFieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EventFieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EventFieldError.prototype, "message", void 0);
EventFieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], EventFieldError);
exports.EventFieldError = EventFieldError;
let EventResponse = class EventResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [EventFieldError], { nullable: true }),
    __metadata("design:type", Array)
], EventResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Event_1.Event, { nullable: true }),
    __metadata("design:type", Event_1.Event)
], EventResponse.prototype, "event", void 0);
EventResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], EventResponse);
class EventResolver {
    async createEvent(name, tagLine, desc, { req }) {
        const errors = (0, validateEvent_1.validateEvent)(name, tagLine, desc);
        if (errors) {
            return { errors };
        }
        const event = await Event_1.Event.create({
            creatorId: req.session.userId,
            name,
            tagLine,
            description: desc,
        }).save();
        return event;
    }
    async getAllEvents() {
        return Event_1.Event.find({
            relations: ["creator", "posts"],
        });
    }
    async getEvent(id) {
        return Event_1.Event.findOne({
            where: { id },
            relations: [
                "creator",
                "posts",
                "posts.creator",
                "posts.event",
                "posts.comments",
            ],
        });
    }
}
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => EventResponse),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("tagLine")),
    __param(2, (0, type_graphql_1.Arg)("desc")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => [Event_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getAllEvents", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Query)(() => Event_1.Event),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEvent", null);
exports.EventResolver = EventResolver;
//# sourceMappingURL=event.js.map