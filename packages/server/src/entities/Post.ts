import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Event } from "./Event";
import { User } from "./User";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    body: string;

    @Field()
    @Column({ default: "" })
    imgUrl: string;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column({ default: 0 })
    likes: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    creator: User;

    @Field()
    @Column()
    eventId: number;

    @Field(() => Event)
    @ManyToOne(() => Event, (event) => event.posts)
    event: Event;

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
