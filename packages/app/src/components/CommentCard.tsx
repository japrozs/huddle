import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, globalStyles, layout, theme } from "../theme";
import { timeSinceShort } from "../utils/timeSince";
import { ProfileImage } from "./ProfileImage";

interface CommentCardProps {
    comment: {
        __typename?: "Comment" | undefined;
        id: number;
        body: string;
        createdAt: string;
        updatedAt: string;
        creator: {
            __typename: "User";
            id: number;
            username: string;
            email: string;
            name: string;
            bio: string;
            imgUrl: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <View style={styles.container}>
            <View style={globalStyles.flex}>
                <View style={styles.img}>
                    <ProfileImage
                        imgUrl={comment.creator.imgUrl}
                        variant={"icon"}
                    />
                </View>
                <Text style={styles.username}>{comment.creator.username}</Text>
                <Text style={styles.date}>
                    {timeSinceShort(comment.createdAt)}
                </Text>
            </View>
            <Text style={styles.comment}>{comment.body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 3,
        marginBottom: 6,
    },
    img: {
        borderColor: theme.borderColor,
        borderWidth: 1,
        borderRadius: 15,
    },
    username: {
        marginHorizontal: 10,
        fontSize: 16,
        fontFamily: fonts.inter_600,
    },
    date: {
        fontSize: 14,
        color: colors.textGray,
        fontFamily: fonts.inter_600,
    },
    comment: {
        marginTop: 2,
        fontSize: 17,
        color: colors.textColor,
        fontFamily: fonts.inter_500,
    },
});
