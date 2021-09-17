"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressIsAuth = exports.isAuth = void 0;
const isAuth = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("not authenticated");
    }
    return next();
};
exports.isAuth = isAuth;
const expressIsAuth = (req, _res, next) => {
    if (!req.session.userId) {
        throw new Error("not authenticated");
    }
    return next();
};
exports.expressIsAuth = expressIsAuth;
//# sourceMappingURL=isAuth.js.map