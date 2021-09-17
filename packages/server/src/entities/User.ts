import { bioGenerator } from "../generators/bio";
import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Event } from "./Event";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ default: "light" })
    theme: string;

    @Field()
    @Column({ default: bioGenerator() })
    bio: string;

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @OneToMany(() => Event, (event) => event.creator)
    events: Event[];

    @Field()
    @Column()
    imgUrl: string;

    @Column()
    password: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
