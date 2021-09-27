import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useLikeMutation } from "../generated/graphql";
import { constants, fonts, globalStyles, layout, theme } from "../theme";

interface ActionTrayProps {
    post: any;
    onPress: any;
}

export const ActionTray: React.FC<ActionTrayProps> = ({ post: p, onPress }) => {
    let postAssigned: ActionTrayProps["post"] = Object.assign({}, p);
    const [post, setPost] = useState(postAssigned);
    const [like] = useLikeMutation();
    const client = useApolloClient();
    const [animation, setAnimation] = useState(
        new Animated.Value(post.voteStatus == 1 ? 1 : 0)
    );

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
            Animated.timing(animation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start(() => {
                Animated.timing(animation, {
                    toValue: 0,
                    duration: constants.ANIMATION_DURATION,
                    useNativeDriver: false,
                }).start();
            });
        } else {
            post.likes++;
            post.voteStatus = 1;
            Animated.timing(animation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start(() => {
                Animated.timing(animation, {
                    toValue: 1,
                    duration: constants.ANIMATION_DURATION,
                    useNativeDriver: false,
                }).start();
            });
        }
        likeFn();
    };

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.borderColor, theme.likeIconBorder],
    });
    const animatedStyle = {
        borderColor: boxInterpolation,
    };

    return (
        <>
            <TouchableOpacity activeOpacity={1} onPress={changeVoteStatus}>
                <Animated.View
                    style={{
                        ...animatedStyle,
                        ...styles.actionIconContainer,
                        ...globalStyles.flex,
                    }}
                >
                    {post?.voteStatus == 1 ? (
                        <Image
                            source={require("../../assets/icons/like.png")}
                            style={{
                                width: layout.iconSize,
                                height: layout.iconSize,
                            }}
                        />
                    ) : (
                        <Image
                            source={require("../../assets/icons/like_gray.png")}
                            style={{
                                width: layout.iconSize,
                                height: layout.iconSize,
                            }}
                        />
                    )}
                    <Text style={styles.likes}>{post?.likes}</Text>
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={[
                    globalStyles.flex,
                    styles.actionIconContainer,
                    { borderColor: theme.borderColor },
                ]}
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
