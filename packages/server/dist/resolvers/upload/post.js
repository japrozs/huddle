"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Post_1 = require("../../entities/Post");
const isAuth_1 = require("../../middleware/isAuth");
const uuid_1 = require("uuid");
const multer_s3_1 = __importDefault(require("multer-s3"));
const router = (0, express_1.Router)();
const ENDPOINT = new aws_sdk_1.default.Endpoint(process.env.DO_ENDPOINT);
const s3 = new aws_sdk_1.default.S3({
    endpoint: ENDPOINT,
    accessKeyId: process.env.DO_ACCESS_KEY_ID,
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
});
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: "huddle-pictures",
        acl: "public-read",
        key: async (_, _file, cb) => {
            const name = await (0, uuid_1.v4)();
            cb(null, "posts/" + name + ".jpg");
        },
    }),
    fileFilter: (_, file, callback) => {
        console.log("mimetype : ", file.mimetype);
        if (file.mimetype.includes("image")) {
            callback(null, true);
        }
        else {
            callback(new Error("Not an image"));
        }
    },
});
router.post("/upload", isAuth_1.expressIsAuth, upload.single("file"), async (req, res) => {
    await Post_1.Post.create({
        creatorId: req.session.userId,
        body: req.body.body,
        eventId: req.body.eventId,
        imgUrl: req.file.location,
    }).save();
    console.log(req.file);
    return res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=post.js.map