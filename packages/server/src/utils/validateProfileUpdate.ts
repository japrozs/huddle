interface OptionProps {
    username: string;
    bio: string;
    name: string;
}

export const validateProfileUpdate = (options: OptionProps) => {
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "Length must be greater than 2",
            },
        ];
    }

    if (options.name.trim().length == 0) {
        return [
            {
                field: "name",
                message: "Name cannot be empty",
            },
        ];
    }

    if (options.username.includes(" ")) {
        return [
            {
                field: "username",
                message: "Username cannot include spaces or @, !, #",
            },
        ];
    }

    return null;
};
