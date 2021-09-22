import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import { PostCard } from "../../../components/PostCard";
import { ProfileImage } from "../../../components/ProfileImage";
import { useGetUserQuery, useMeQuery } from "../../../generated/graphql";
import { colors, fonts, globalStyles, layout } from "../../../theme";
import { SelfProfileStackNav } from "./SelfProfileNav";
import { EventCard } from "../../../components/EventCard";
import { Event, Post } from "../../../generated/graphql";

interface UserPageProps {}

export type PropType = SelfProfileStackNav<"SelfProfile">;

export const SelfProfile: React.FC<PropType> = ({ route, navigation }) => {
    const { data: d } = useMeQuery();
    const { data, loading } = useGetUserQuery({
        variables: {
            id: d?.me?.id || 0,
        },
    });
    console.log("data from user page : ", data);
    return (
        <ScrollView>
            <View style={{ padding: 12 }}>
                <View style={[globalStyles.flex]}>
                    <View style={styles.img}>
                        <ProfileImage
                            imgUrl={data?.getUser.imgUrl}
                            variant={"regular"}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{data?.getUser.name}</Text>
                        <Text style={styles.username}>
                            @{data?.getUser.username}
                        </Text>
                    </View>
                </View>
                <Text style={[globalStyles.heading, styles.heading]}>
                    EVENTS
                </Text>
                <ScrollView horizontal={true}>
                    {data?.getUser.events.map((event: any) => (
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
                <Text style={[globalStyles.heading, styles.heading]}>
                    POSTS
                </Text>
            </View>
            {data?.getUser.posts.map((post: any) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("PostPage", {
                            id: post.id,
                        });
                    }}
                    key={post.id}
                >
                    <PostCard post={post} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    img: {
        borderColor: colors.gray,
        borderWidth: 1,
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
        color: colors.textGray,
        fontSize: 19,
        fontFamily: fonts.inter_500,
    },
    infoContainer: {
        marginLeft: 40,
    },
    heading: {
        marginLeft: 10,
        marginTop: 20,
    },
});
