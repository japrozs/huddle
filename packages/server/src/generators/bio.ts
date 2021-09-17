const bios: string[] = [
    "¯\\_(ツ)_/¯",
    "Working on the next greatest event",
    "meh",
    ":) <3",
];

export const bioGenerator = () => {
    return bios[Math.floor(Math.random() * bios.length)];
};
