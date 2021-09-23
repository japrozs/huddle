import { Router } from "express";
import multer, { FileFilterCallback } from "multer";
import aws from "aws-sdk";
import { Post } from "../../entities/Post";
import { expressIsAuth } from "../../middleware/isAuth";
import { v4 } from "uuid";
import multers3 from "multer-s3";

const router = Router();

const ENDPOINT = new aws.Endpoint(process.env.DO_ENDPOINT);

const s3 = new aws.S3({
    endpoint: ENDPOINT,
    accessKeyId: process.env.DO_ACCESS_KEY_ID,
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
});

const upload = multer({
    storage: multers3({
        s3,
        bucket: "huddle-pictures",
        acl: "public-read",
        key: async (_: any, _file: any, cb: any) => {
            const name = await v4();
            cb(null, "posts/" + name + ".jpg"); // e.g. jh34gh2v4y + .jpg
        },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        console.log("mimetype : ", file.mimetype);
        if (file.mimetype.includes("image")) {
            callback(null, true);
        } else {
            callback(new Error("Not an image"));
        }
    },
});

router.post(
    "/upload",
    expressIsAuth,
    upload.single("file"),
    async (req, res) => {
        await Post.create({
            creatorId: req.session.userId,
            body: req.body.body,
            eventId: req.body.eventId,
            imgUrl: (req.file as any).location,
        }).save();
        console.log(req.file);
        return res.json({ success: true });
    }
);

export default router;
