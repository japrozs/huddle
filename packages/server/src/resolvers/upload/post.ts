import { Router } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Post } from "../../entities/Post";
import { expressIsAuth } from "../../middleware/isAuth";
import { v4 } from "uuid";

const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../../../images/posts"),
        filename: async (_: any, _file: any, callback: any) => {
            const name = await v4();
            callback(null, name + ".jpg"); // e.g. jh34gh2v4y + .jpg
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
            imgUrl: `http://192.168.1.5:4000/images/posts/${req.file?.filename}`,
        }).save();
        console.log(req.file);
        return res.json({ success: true });
    }
);

export default router;
