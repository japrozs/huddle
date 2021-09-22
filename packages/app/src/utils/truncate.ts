export const truncate = (str: string, len: number): string => {
    if (str.length <= len) {
        return str;
    } else {
        return str.substring(0, len) + "...";
    }
};
