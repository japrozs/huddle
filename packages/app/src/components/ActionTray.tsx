import { useApolloClient } from "@apollo/client";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLikeMutation } from "../generated/graphql";
import { fonts, globalStyles, layout, theme } from "../theme";

interface ActionTrayProps {
    post: any;
    onPress: any;
}

export const ActionTray: React.FC<ActionTrayProps> = ({ post: p, onPress }) => {
    const [like] = useLikeMutation();
    const client = useApolloClient();

    let post: ActionTrayProps["post"];
    Object.assign(post, p);

    const likeFn = async () => {
        await like({
            variables: {
                postId: post?.id || 0,
            },
        });

        await client.resetStore();
    };

    const changeVoteStatus = async () => {
        if (post.voteStatus == 1) {
            post.likes--;
            post.voteStatus = null;
        } else {
            post.likes++;
            post.voteStatus = 1;
        }
        likeFn();
    };

    return (
        <>
            {post?.voteStatus == 1 ? (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={changeVoteStatus}
                    style={[
                        globalStyles.flex,
                        styles.actionIconContainer,
                        { borderColor: theme.likeIconBorder },
                    ]}
                >
                    <Image
                        source={require("../../assets/icons/like.png")}
                        style={{
                            width: layout.iconSize,
                            height: layout.iconSize,
                        }}
                    />
                    <Text style={styles.likes}>{post?.likes}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={changeVoteStatus}
                    style={[globalStyles.flex, styles.actionIconContainer]}
                >
                    <Image
                        source={require("../../assets/icons/like_gray.png")}
                        style={{
                            width: layout.iconSize,
                            height: layout.iconSize,
                        }}
                    />
                    <Text style={styles.likes}>{post?.likes}</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={[globalStyles.flex, styles.actionIconContainer]}
            >
                <Image
                    source={require("../../assets/icons/comment.png")}
                    style={{
                        width: layout.iconSize,
                        height: layout.iconSize,
                    }}
                />
                <Text onPress={onPress} style={styles.comments}>
                    {post?.comments?.length}
                </Text>
            </TouchableOpacity>
        </>
    );
};
const styles = StyleSheet.create({
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
    likes: {
        marginLeft: 5,
        fontSize: 18,
        fontFamily: fonts.inter_600,
        color: theme.grayDark,
    },
});
