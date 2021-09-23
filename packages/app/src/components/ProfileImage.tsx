import React from "react";
import { StyleSheet } from "react-native";
import { Image, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { colors, layout, constants } from "../theme";

type VariantProps =
    | "regular"
    | "icon"
    | "post"
    | "comment"
    | "small"
    | "search";

interface ProfileImageProps {
    imgUrl: string | undefined;
    variant: VariantProps;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    imgUrl,
    variant,
}) => {
    let width = 0;
    let height = 0;
    switch (variant) {
        case "regular": {
            width = layout.images.profileImgWidth;
            height = layout.images.profileImgHeight;
            break;
        }
        case "icon": {
            width = layout.images.smallProfileImgWidth;
            height = layout.images.smallProfileImgHeight;
            break;
        }
        case "post": {
            width = layout.images.postProfileImgWidth;
            height = layout.images.postProfileImgHeight;
            break;
        }
        case "comment": {
            width = 28;
            height = 28;
            break;
        }
        case "small": {
            width = 31;
            height = 31;
            break;
        }
        case "search": {
            width = 40;
            height = 40;
            break;
        }
    }
    return (
        <View>
            {imgUrl?.split(".").pop() == "svg" ? (
                <SvgUri
                    style={{ width, height, borderRadius: width / 2 }}
                    uri={imgUrl || ""}
                />
            ) : (
                <Image
                    style={{ width, height, borderRadius: width / 2 }}
                    source={{ uri: imgUrl || constants.emptyIcon }}
                />
            )}
        </View>
    );
};
