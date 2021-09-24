import { Feather } from "@expo/vector-icons";
import React from "react";
import { layout, theme } from "../theme";

interface PostMoreProps {
    post: any;
}

export const PostMore: React.FC<PostMoreProps> = ({ post, ...props }) => {
    return (
        <Feather
            onPress={() => alert("reporting the post")}
            style={{ marginLeft: "auto", marginRight: 0 }}
            name="more-vertical"
            size={layout.iconSize}
            color={theme.grayDark}
        />
    );
};
