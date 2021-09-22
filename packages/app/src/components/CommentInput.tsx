import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { useCreateCommentMutation, useMeQuery } from "../generated/graphql";
import { colors, fonts, globalStyles, layout, theme } from "../theme";
import { ProfileImage } from "./ProfileImage";

interface CommentInputProps {
    postId: number | undefined;
}

export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
    const { data, loading } = useMeQuery();
    const [comment, setComment] = useState("");
    const [createComment] = useCreateCommentMutation();
    const client = useApolloClient();

    const submit = async () => {
        if (comment.trim().length == 0) {
            return;
        }
        setComment("");
        const res = await createComment({
            variables: {
                body: comment,
                postId: postId || 0,
            },
        });
        await client.resetStore();
    };

    return (
        <View style={[globalStyles.flex, styles.container]}>
            <View style={styles.img}>
                <ProfileImage imgUrl={data?.me?.imgUrl} variant={"post"} />
            </View>
            <TextInput
                autoCapitalize={"none"}
                value={comment}
                onChangeText={(t) => setComment(t)}
                placeholder={"Comment goes here..."}
                onEndEditing={submit}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderTopColor: theme.borderColor,
        borderTopWidth: 1,
        backgroundColor: colors.backgroundColor,
        position: "absolute",
        bottom: 0,
    },
    input: {
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.inputBackgroundColor,
        borderRadius: 4,
        marginLeft: 10,
        width: Dimensions.get("screen").width - 63,
        fontSize: 16,
        fontFamily: fonts.inter_500,
    },
    img: {
        borderColor: theme.borderColor,
        borderWidth: 1,
        borderRadius: layout.images.postProfileImgHeight / 2,
    },
});
