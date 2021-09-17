export const validateEvent = (
    name: string,
    tagLine: string,
    desc: string
): null | object[] => {
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
                field: "description",
                message: "Length must be greater than description",
            },
        ];
    }
    return null;
};
