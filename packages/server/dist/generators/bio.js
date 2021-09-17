"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bioGenerator = void 0;
const bios = [
    "¯\\_(ツ)_/¯",
    "Working on the next greatest event",
    "meh",
    ":) <3",
];
const bioGenerator = () => {
    return bios[Math.floor(Math.random() * bios.length)];
};
exports.bioGenerator = bioGenerator;
//# sourceMappingURL=bio.js.map