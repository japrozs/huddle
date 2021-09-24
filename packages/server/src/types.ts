import { Request, Response } from "express";
import session from "express-session";
import { Redis } from "ioredis";
import { createLikeLoader } from "./utils/loaders/createLikeLoader";

declare module "express-session" {
    interface SessionData {
        userId: any;
    }
}

export type Context = {
    req: Request & { session: session.Session };
    redis: Redis;
    res: Response;
    likeLoader: ReturnType<typeof createLikeLoader>;
};
