import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import {
    colors,
    constants,
    fonts,
    globalStyles,
    layout,
    theme,
} from "../theme";
import { PostType } from "../types";
import { ProfileImage } from "../components/ProfileImage";
import { timeSinceShort } from "../utils/timeSince";
import { MaterialIcons } from "@expo/vector-icons";
import { truncate } from "../utils/truncate";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLikeMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { ActionTray } from "./ActionTray";
import { PostMore } from "./PostMore";

interface PostCardProps {
    post: any;
    onPress: any;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
    const [like] = useLikeMutation();
    const client = useApolloClient();
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                activeOpacity={constants.ACTIVE_OPACITY}
                onPress={onPress}
            >
                <View style={[globalStyles.flex, styles.container]}>
                    <View style={styles.imgContainer}>
                        <ProfileImage
                            imgUrl={post.creator.imgUrl}
                            variant={"post"}
                        />
                    </View>
                    <View style={globalStyles.flex}>
                        <Text style={styles.username}>
                            {post.creator.username}
                        </Text>
                        <Text style={styles.event}>
                            {" "}
                            • {post.event.name.toLowerCase()}
                        </Text>
                    </View>
                    <Text style={styles.date}>
                        {timeSinceShort(post.createdAt)}
                    </Text>
                </View>
            </TouchableOpacity>

            {post.imgUrl.trim().length == 0 ? (
                <Text
                    style={{
                        fontSize: 21,
                        fontFamily: fonts.inter_600,
                        paddingHorizontal: 13,
                        paddingVertical: 7,
                        paddingBottom: 13,
                    }}
                    onPress={onPress}
                >
                    {truncate(post.body, constants.POST_BODY_TRUNCATE_LENGTH)}
                </Text>
            ) : (
                <>
                    <Text
                        onPress={onPress}
                        style={{
                            fontSize: 19,
                            fontFamily: fonts.inter_600,
                            paddingHorizontal: 13,
                            paddingVertical: 7,
                            paddingBottom: 13,
                        }}
                    >
                        {truncate(
                            post.body,
                            constants.POST_BODY_TRUNCATE_LENGTH
                        )}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={constants.ACTIVE_OPACITY}
                        onPress={onPress}
                    >
                        <Image
                            style={[
                                styles.img,
                                { backgroundColor: theme.headingColor },
                            ]}
                            source={{
                                uri: post.imgUrl,
                            }}
                        />
                    </TouchableOpacity>
                </>
            )}
            <View style={[globalStyles.flex, styles.iconContainer]}>
                <ActionTray onPress={onPress} post={post} />
                <PostMore post={post} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 13,
        paddingBottom: 0,
    },
    mainContainer: {
        borderBottomColor: theme.borderColor,
        borderBottomWidth: 1,
    },
    imgContainer: {
        height: layout.images.postProfileImgHeight,
        width: layout.images.postProfileImgWidth,
        backgroundColor: "#fff",
        overflow: "hidden",
        borderRadius: layout.borderRadius,
        borderColor: theme.borderColor,
        borderWidth: 0.8,
        marginRight: 12,
    },
    username: {
        color: colors.textColor,
        fontSize: 18,
        fontFamily: fonts.inter_600,
    },
    img: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width,
        marginBottom: 10,
    },
    event: {
        fontSize: 18,
        color: theme.grayDark,
        fontFamily: fonts.inter_500,
    },
    date: {
        fontSize: 15,
        marginLeft: "auto",
        alignSelf: "center",
        marginRight: 0,
        fontFamily: fonts.inter_600,
        color: theme.grayDark,
    },
    iconContainer: {
        marginVertical: 10,
        paddingHorizontal: 13,
        marginBottom: 13,
    },
    likes: {
        marginLeft: 5,
        fontSize: 18,
        fontFamily: fonts.inter_600,
        color: theme.grayDark,
    },
    comments: {
        marginLeft: 5,
        fontSize: 18,
        fontFamily: fonts.inter_600,
        color: theme.grayDark,
    },
    actionIconContainer: {
        borderColor: theme.borderColor,
        borderRadius: 4,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginRight: 15,
    },
});
