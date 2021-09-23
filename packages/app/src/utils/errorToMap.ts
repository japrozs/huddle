interface Error {
    field: string;
    message: string;
}

export const errorToMap = (errors: Error[]) => {
    const map: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        map[field] = message;
    });

    return map;
};
