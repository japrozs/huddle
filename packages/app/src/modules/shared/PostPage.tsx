import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { CommentCard } from "../../components/CommentCard";
import { CommentInput } from "../../components/CommentInput";
import { ProfileImage } from "../../components/ProfileImage";
import { useGetCommentsQuery, useGetPostQuery } from "../../generated/graphql";
import { colors, fonts, globalStyles, layout, theme } from "../../theme";
import { timeSinceShort } from "../../utils/timeSince";
import { HomeStackNav } from "../main/Home/HomeNav";
import { SearchStackNav } from "../main/search/SearchNav";

interface PostPageProps {}

export type PropType = SearchStackNav<"PostPage"> | HomeStackNav<"PostPage">;

export const PostPage: React.FC<PropType> = ({ route, navigation }) => {
    const { data, loading } = useGetPostQuery({
        variables: {
            id: route.params.id,
        },
    });

    const { data: comments } = useGetCommentsQuery({
        variables: {
            id: data?.getPost.id || 0,
        },
    });

    return (
        <View style={{ height: "100%" }}>
            <ScrollView style={{ marginBottom: 50 }}>
                <View
                    style={[
                        globalStyles.flex,
                        { padding: 12, paddingBottom: 0 },
                    ]}
                >
                    <View style={styles.img}>
                        <ProfileImage
                            imgUrl={data?.getPost.creator.imgUrl}
                            variant={"post"}
                        />
                    </View>
                    <Text
                        style={styles.username}
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate("UserPage", {
                                id: data?.getPost.creator.id,
                                name: data?.getPost.creator.name,
                            });
                        }}
                    >
                        {data?.getPost.creator.username}
                    </Text>
                    <Text style={styles.time}>
                        {timeSinceShort(data?.getPost.createdAt)}
                    </Text>
                </View>
                {data?.getPost.imgUrl.trim().length == 0 ? (
                    <Text
                        style={{
                            fontSize: 24,
                            fontFamily: fonts.inter_600,
                            padding: 12,
                            paddingTop: 3,
                            paddingBottom: 0,
                        }}
                    >
                        {data?.getPost.body}
                    </Text>
                ) : (
                    <>
                        <Text
                            style={{
                                padding: 19,
                                fontSize: 20,
                                fontFamily: fonts.inter_600,
                            }}
                        >
                            {data?.getPost.body}
                        </Text>
                        <Image
                            style={styles.postImg}
                            source={{ uri: data?.getPost.imgUrl }}
                        />
                    </>
                )}
                <View style={{ padding: 12 }}>
                    <Text
                        style={[globalStyles.heading, { marginVertical: 10 }]}
                    >
                        COMMENTS
                    </Text>
                    {comments?.getComments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </View>
            </ScrollView>
            <CommentInput postId={data?.getPost.id} />
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        borderColor: theme.borderColor,
        borderWidth: 1,
        borderRadius: layout.images.postProfileImgWidth / 2 + 10,
    },
    username: {
        fontSize: 20,
        fontFamily: fonts.inter_500,
        marginLeft: 10,
    },
    time: {
        marginLeft: "auto",
        marginRight: 0,
        color: colors.textColor,
        fontSize: 16,
        fontFamily: fonts.inter_600,
    },
    postImg: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width,
    },
});
