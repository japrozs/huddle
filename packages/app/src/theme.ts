import { Dimensions, StyleSheet } from "react-native";

export const colors = {
    textColor: "#000",
    backgroundColor: "#fff",
    navigation: {
        active: "#000",
        inActive: "#838383",
    },
    errorRed: "#DC2626",
    inputBorder: "#4B5563",
    gray: "#666",
    lightGray: "#777",
    lightBackground: "#E5E7EB",
    buttonBackgroundColor: "#000",
    buttonColor: "#fff",
    inputPlaceholderColor: "#333",
    inputBackgroundColor: "#eee",
    textGray: "#444",
};

export const theme = {
    inputBackgroundColor: "#EEEEEE",
    red: "#C53030",
    headingColor: "#5D7290",
    borderColor: "#B2BDCD",
    black: "#0B0E11",
    textColor: "#0B0E11",
    gray: "#323D4D",
    grayDark: "#404F64",
    backgroundColor: "#FAFAFA",
    turqoise: "#15CDA8",
    blue: "#082246",
    likeIconBorder: "#E5678D",
};

export const fonts = {
    inter_100: "Inter 100",
    inter_200: "Inter 200",
    inter_300: "Inter 300",
    inter_400: "Inter 400",
    inter_500: "Inter 500",
    inter_600: "Inter 600",
    inter_700: "Inter 700",
    inter_800: "Inter 800",
    inter_900: "Inter 900",
    menlo: "Menlo",
};

const iconSize = 25;

export const layout = {
    iconSize: iconSize,
    borderRadius: 25,
    images: {
        profileImgHeight: 100,
        profileImgWidth: 100,
        smallProfileImgHeight: iconSize,
        smallProfileImgWidth: iconSize,
        postProfileImgHeight: 33,
        postProfileImgWidth: 33,
    },
};

export const constants = {
    emptyIcon:
        "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed68e8310716f0007411996%2F0x0.jpg",
    inputWidth: Dimensions.get("window").width - 30,
    POST_BODY_TRUNCATE_LENGTH: 50,
    ACTIVE_OPACITY: 1,
    ANIMATION_DURATION: 180,
    IMAGE_MODAL_OPACITY: 0.97,
};

export const globalStyles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        backgroundColor: theme.black,
        paddingVertical: 10,
        borderRadius: 5,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 19,
        fontFamily: fonts.inter_600,
        alignSelf: "center",
    },
    heading: {
        fontSize: 15,
        color: theme.headingColor,
        fontFamily: fonts.inter_700,
    },
});
