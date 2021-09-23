"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvent = void 0;
const validateEvent = (name, tagLine, desc) => {
    if (tagLine.length <= 2) {
        return [
            {
                field: "tagLine",
                message: "Length must be greater than 2",
            },
        ];
    }
    if (name.trim().length == 0) {
        return [
            {
                field: "name",
                message: "Name cannot be empty",
            },
        ];
    }
    if (desc.length <= 10) {
        return [
            {
                field: "desc",
                message: "Length must be greater than 10",
            },
        ];
    }
    return null;
};
exports.validateEvent = validateEvent;
//# sourceMappingURL=validateEvent.js.map