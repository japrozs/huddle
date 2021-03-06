import { Event } from "../entities/Event";
import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    UseMiddleware,
} from "type-graphql";
import { Context } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { validateEvent } from "../utils/validateEvent";
import { Post } from "../entities/Post";

@ObjectType()
export class EventFieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class EventResponse {
    @Field(() => [EventFieldError], { nullable: true })
    errors?: EventFieldError[];

    @Field(() => Event, { nullable: true })
    event?: Event;
}

export class EventResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => EventResponse)
    async createEvent(
        @Arg("name") name: string,
        @Arg("tagLine") tagLine: string,
        @Arg("desc") desc: string,
        @Ctx() { req }: Context
    ) {
        const errors: null | object[] = validateEvent(name, tagLine, desc);
        if (errors) {
            return { errors };
        }
        const event = await Event.create({
            creatorId: req.session.userId,
            name,
            tagLine,
            description: desc,
        }).save();
        return event;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateEvent(
        @Arg("eventId", () => Int!) eventId: number,
        @Arg("name") name: string,
        @Arg("tagLine") tagLine: string,
        @Arg("desc") desc: string,
        @Arg("location") location: string,
        @Ctx() { req }: Context
    ) {
        const event = await Event.findOne({
            where: { id: eventId },
            relations: ["creator"],
        });
        if (event?.creator.id != req.session.userId) {
            return false;
        }
        await Event.update(
            { id: eventId },
            {
                name,
                tagLine,
                description: desc,
                location,
            }
        );
        return true;
    }

    @UseMiddleware(isAuth)
    @Query(() => [Event])
    async getAllEvents() {
        return Event.find({
            relations: ["creator", "posts"],
        });
    }

    @UseMiddleware(isAuth)
    @Query(() => Event)
    async getEvent(@Arg("id", () => Int) id: number) {
        let event = await Event.findOne({
            where: { id },
            relations: [
                "creator",
                "posts",
                "posts.creator",
                "posts.event",
                "posts.comments",
            ],
        });
        const posts = await Post.find({
            where: { eventId: event?.id },
            order: { createdAt: "DESC" },
            relations: ["creator", "event", "comments"],
        });
        event!.posts = posts;
        return event;
    }
}
