"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Post_1 = require("../../entities/Post");
const isAuth_1 = require("../../middleware/isAuth");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: path_1.default.join(__dirname, "../../../images/posts"),
        filename: async (_, _file, callback) => {
            const name = await (0, uuid_1.v4)();
            callback(null, name + ".jpg");
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
    var _a;
    await Post_1.Post.create({
        creatorId: req.session.userId,
        body: req.body.body,
        eventId: req.body.eventId,
        imgUrl: `http://localhost:4000/images/posts/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`,
    }).save();
    console.log(req.file);
    return res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=post.js.map