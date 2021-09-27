import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import { EventCard } from "../../components/EventCard";
import { PostCard } from "../../components/PostCard";
import { ProfileImage } from "../../components/ProfileImage";
import { useGetUserQuery } from "../../generated/graphql";
import { colors, fonts, globalStyles, layout, theme } from "../../theme";
import { SearchStackNav } from "../main/search/SearchNav";
import { MaterialIcons } from "@expo/vector-icons";
import { timeSince } from "../../utils/timeSince";
import { HomeStackNav } from "../main/Home/HomeNav";
import { Loading } from "../../components/Loading";

interface UserPageProps {}

export type PropType = SearchStackNav<"UserPage">;

export const UserPage: React.FC<PropType> = ({ route, navigation }) => {
    const { data, loading } = useGetUserQuery({
        variables: {
            id: route.params.id,
        },
    });
    console.log("data from user page : ", data);
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
                        <View style={{ padding: 12 }}>
                            <View style={[globalStyles.flex]}>
                                <View style={styles.img}>
                                    <ProfileImage
                                        imgUrl={data?.getUser.imgUrl}
                                        variant={"regular"}
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
                                                { fontFamily: fonts.inter_600 },
                                            ]}
                                        >
                                            {timeSince(data?.getUser.createdAt)}
                                        </Text>
                                        <Text style={styles.date}>ago</Text>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={[globalStyles.heading, styles.heading]}
                            >
                                EVENTS
                            </Text>
                            <ScrollView horizontal={true}>
                                {data?.getUser.events.map((event) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("EventPage", {
                                                id: event.id,
                                                name: event.name,
                                            });
                                        }}
                                        key={event.id}
                                    >
                                        <EventCard event={event} />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <Text
                                style={[globalStyles.heading, styles.heading]}
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
                    )}
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
