"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const user_1 = require("./resolvers/user");
const User_1 = require("./entities/User");
const Post_1 = require("./entities/Post");
const Comment_1 = require("./entities/Comment");
const post_1 = require("./resolvers/post");
const post_2 = __importDefault(require("./resolvers/upload/post"));
const Event_1 = require("./entities/Event");
const event_1 = require("./resolvers/event");
const comment_1 = require("./resolvers/comment");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "huddle",
        username: "postgres",
        password: "postgres",
        logging: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        synchronize: true,
        entities: [User_1.User, Post_1.Post, Event_1.Event, Comment_1.Comment],
    });
    conn.runMigrations();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, cors_1.default)({
        origin: "http://localhost:19006",
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use("/images/", express_1.default.static(path_1.default.join(__dirname, "../images/")));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: "uixerw7923sh28y235sm19s934dh3785sh",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                user_1.UserResolver,
                post_1.PostResolver,
                event_1.EventResolver,
                comment_1.CommentResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    app.use("/", post_2.default);
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map