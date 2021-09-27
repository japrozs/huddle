import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActionTray } from "../../components/ActionTray";
import { CommentCard } from "../../components/CommentCard";
import { CommentInput } from "../../components/CommentInput";
import { PostMore } from "../../components/PostMore";
import { ProfileImage } from "../../components/ProfileImage";
import { useGetCommentsQuery, useGetPostQuery } from "../../generated/graphql";
import {
    colors,
    constants,
    fonts,
    globalStyles,
    layout,
    theme,
} from "../../theme";
import { timeSinceShort } from "../../utils/timeSince";
import { HomeStackNav } from "../main/Home/HomeNav";
import { SearchStackNav } from "../main/search/SearchNav";
import { SelfProfileStackNav } from "../main/selfProfile/selfProfileNav";
import ImageZoom from "react-native-image-pan-zoom";

interface PostPageProps {}

export type PropType =
    | SearchStackNav<"PostPage">
    | HomeStackNav<"PostPage">
    | SelfProfileStackNav<"PostPage">;

export const PostPage: React.FC<PropType> = ({ route, navigation }) => {
    const { data, loading } = useGetPostQuery({
        variables: {
            id: route.params.id,
        },
    });

    console.log("data from useGetPostQuery ::", data);

    const { data: comments } = useGetCommentsQuery({
        variables: {
            id: data?.getPost.id || 0,
        },
    });
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View
                    style={{
                        backgroundColor: theme.black,
                        height: "100%",
                        opacity: constants.IMAGE_MODAL_OPACITY,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <AntDesign
                        name="close"
                        onPress={() => setModalVisible(false)}
                        style={{
                            zIndex: 100,
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                        size={layout.iconSize - 2}
                        color={theme.backgroundColor}
                    />
                    <ImageZoom
                        cropWidth={Dimensions.get("window").width}
                        cropHeight={Dimensions.get("window").height}
                        imageWidth={Dimensions.get("screen").width}
                        imageHeight={Dimensions.get("screen").width}
                    >
                        <Image
                            source={{ uri: data?.getPost.imgUrl }}
                            style={{
                                width: Dimensions.get("screen").width,
                                height: Dimensions.get("screen").width,
                            }}
                        />
                    </ImageZoom>
                </View>
            </Modal>
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
                        <Text
                            style={styles.event}
                            onPress={() => {
                                // @ts-ignore
                                navigation.navigate("EventPage", {
                                    id: data?.getPost.event.id,
                                    name: data?.getPost.event.name,
                                });
                            }}
                        >
                            {" "}
                            • {data?.getPost.event.name.toLowerCase()}
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
                            <TouchableOpacity
                                style={{ backgroundColor: theme.headingColor }}
                                onPress={() => setModalVisible(true)}
                                activeOpacity={1}
                            >
                                <Image
                                    style={styles.postImg}
                                    source={{ uri: data?.getPost.imgUrl }}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                    <View style={[globalStyles.flex, styles.iconContainer]}>
                        <ActionTray onPress={() => {}} post={data?.getPost} />
                        <PostMore post={data?.getPost} />
                    </View>
                    <View style={{ padding: 12 }}>
                        <Text
                            style={[
                                globalStyles.heading,
                                { marginVertical: 10 },
                            ]}
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
        </>
    );
};

const styles = StyleSheet.create({
    img: {
        borderColor: theme.borderColor,
        borderWidth: 1,
        borderRadius: layout.images.postProfileImgWidth / 2 + 10,
    },
    username: {
        color: colors.textColor,
        fontSize: 18,
        fontFamily: fonts.inter_600,
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
    iconContainer: {
        marginVertical: 10,
        paddingHorizontal: 13,
        marginBottom: 0,
    },
    event: {
        fontSize: 18,
        color: theme.grayDark,
        fontFamily: fonts.inter_500,
    },
});
