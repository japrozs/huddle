import React, { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import { PostCard } from "../../../components/PostCard";
import { ProfileImage } from "../../../components/ProfileImage";
import { useGetUserQuery, useMeQuery } from "../../../generated/graphql";
import { colors, fonts, globalStyles, layout, theme } from "../../../theme";
import { SelfProfileStackNav } from "./SelfProfileNav";
import { EventCard } from "../../../components/EventCard";
import { Event, Post } from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { timeSince } from "../../../utils/timeSince";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { EditProfileModal } from "../../../components/edit/EditProfileModal";
import { useApolloClient } from "@apollo/client";

interface UserPageProps {}

export type PropType = SelfProfileStackNav<"SelfProfilePage">;

export const SelfProfile: React.FC<PropType> = ({ route, navigation }) => {
    const { data: d } = useMeQuery();
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading } = useGetUserQuery({
        variables: {
            id: d?.me?.id || 0,
        },
    });
    const [modalVisible, setModalVisible] = useState(false);
    console.log("data from user page : ", data);
    const client = useApolloClient();

    const refresh = async () => {
        await client.resetStore();
    };

    return (
        <SafeAreaView>
            {data ? (
                <FlatList
                    data={data.getUser.posts}
                    renderItem={({ item }) => (
                        <PostCard
                            post={item}
                            onPress={() => {
                                navigation.navigate("PostPage", {
                                    id: item.id,
                                });
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={() => (
                        <>
                            <EditProfileModal
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                                data={data}
                            />
                            <View style={{ padding: 12 }}>
                                <View style={[globalStyles.flex]}>
                                    <View style={styles.img}>
                                        <ProfileImage
                                            imgUrl={data?.getUser.imgUrl}
                                            variant={"regular"}
                                        />
                                        <Feather
                                            style={{
                                                borderRadius: 50,
                                                borderColor: theme.borderColor,
                                                borderWidth: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 6,
                                                marginTop: -29,
                                                marginLeft: "auto",
                                                marginRight: -5,
                                                backgroundColor:
                                                    theme.backgroundColor,
                                            }}
                                            name="edit-2"
                                            size={layout.iconSize}
                                            color={theme.headingColor}
                                            onPress={() =>
                                                setModalVisible(true)
                                            }
                                        />
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.name}>
                                            {data?.getUser.name}
                                        </Text>
                                        <View style={globalStyles.flex}>
                                            <MaterialIcons
                                                name="alternate-email"
                                                size={19}
                                                color={theme.grayDark}
                                            />
                                            <Text style={styles.username}>
                                                {data?.getUser.username}
                                            </Text>
                                        </View>
                                        <View style={globalStyles.flex}>
                                            <MaterialIcons
                                                name="cake"
                                                size={19}
                                                color={theme.grayDark}
                                            />
                                            <Text
                                                style={[
                                                    styles.date,
                                                    {
                                                        fontFamily:
                                                            fonts.inter_600,
                                                    },
                                                ]}
                                            >
                                                {timeSince(
                                                    data?.getUser.createdAt
                                                )}
                                            </Text>
                                            <Text style={styles.date}>ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text
                                    style={[
                                        globalStyles.heading,
                                        styles.heading,
                                    ]}
                                >
                                    EVENTS
                                </Text>
                                <ScrollView horizontal={true}>
                                    {data?.getUser.events.map((event) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(
                                                    "EventPage",
                                                    {
                                                        id: event.id,
                                                        name: event.name,
                                                    }
                                                );
                                            }}
                                            key={event.id}
                                        >
                                            <EventCard event={event} />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <Text
                                    style={[
                                        globalStyles.heading,
                                        styles.heading,
                                    ]}
                                >
                                    POSTS
                                </Text>
                                {!data && loading ? <Loading /> : <></>}
                                {data && data?.getUser.posts.length == 0 ? (
                                    <Text>there are no posts</Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </>
                    )}
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            ) : (
                <></>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    img: {
        marginLeft: 10,
        width: layout.images.profileImgWidth,
        height: layout.images.profileImgHeight,
        borderRadius: layout.images.profileImgWidth / 2,
    },
    name: {
        color: colors.textColor,
        fontSize: 25,
        fontFamily: fonts.inter_500,
    },
    username: {
        color: theme.grayDark,
        fontSize: 19,
        fontFamily: fonts.inter_500,
        alignSelf: "center",
        marginLeft: 4,
    },
    infoContainer: {
        marginLeft: 30,
    },
    heading: {
        marginLeft: 10,
        marginTop: 20,
    },
    date: {
        color: theme.grayDark,
        fontSize: 19,
        fontFamily: fonts.inter_500,
        alignSelf: "center",
        marginLeft: 5,
    },
});
