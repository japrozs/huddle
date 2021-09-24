import { useApolloClient } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { PostCard } from "../../components/PostCard";
import { useGetEventQuery } from "../../generated/graphql";
import { colors, fonts, globalStyles } from "../../theme";
import { HomeStackNav } from "../main/Home/HomeNav";
import { SearchStackNav } from "../main/search/SearchNav";
import { SelfProfileStackNav } from "../main/selfProfile/selfProfileNav";

interface EventPageProps {}

export type PropType =
    | SearchStackNav<"EventPage">
    | HomeStackNav<"EventPage">
    | SelfProfileStackNav<"EventPage">;

export const EventPage: React.FC<PropType> = ({ route, navigation }) => {
    let { data, loading } = useGetEventQuery({
        variables: {
            id: route.params.id,
        },
    });
    const [refreshing, setRefreshing] = useState(false);

    const client = useApolloClient();

    const refresh = async () => {
        await client.resetStore();
    };

    return (
        <SafeAreaView>
            {data ? (
                <FlatList
                    data={data?.getEvent.posts}
                    renderItem={({ item }) => (
                        <PostCard
                            post={item}
                            onPress={() => {
                                // @ts-ignore
                                navigation.navigate("PostPage", {
                                    id: item.id,
                                });
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={() => (
                        <>
                            <Image
                                source={{ uri: data?.getEvent.imgUrl }}
                                style={styles.img}
                            />
                            <View style={styles.container}>
                                <Text style={styles.eventName}>
                                    {data?.getEvent.name}
                                </Text>
                                <Text style={styles.tagLine}>
                                    {data?.getEvent.tagLine}
                                </Text>
                                <View style={globalStyles.flex}>
                                    <Text style={styles.date}>Created by </Text>
                                    <Text style={[styles.date, styles.bold]}>
                                        {data?.getEvent.creator.username}
                                    </Text>
                                    <Text style={styles.date}> on </Text>
                                    <Text style={[styles.date, styles.bold]}>
                                        {new Date(
                                            parseInt(
                                                data?.getEvent?.createdAt || ""
                                            )
                                        ).toLocaleDateString()}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        // @ts-ignore
                                        navigation.navigate("CreatePost", {
                                            id: data?.getEvent.id || 0,
                                            imgUrl: data?.getEvent.imgUrl || "",
                                            name: data?.getEvent.name || "",
                                        });
                                    }}
                                    style={[globalStyles.button, styles.button]}
                                >
                                    <Text style={globalStyles.buttonText}>
                                        Create new post
                                    </Text>
                                </TouchableOpacity>
                                <Text style={globalStyles.heading}>
                                    RECENT POSTS
                                </Text>
                                {data && data?.getEvent.posts.length == 0 ? (
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
    container: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    img: {
        width: Dimensions.get("screen").width,
        height: 200,
    },
    eventName: {
        fontSize: 33,
        fontFamily: fonts.inter_700,
    },
    tagLine: {
        color: colors.gray,
        fontSize: 19,
        fontFamily: fonts.inter_500,
        marginVertical: 7,
    },
    date: {
        fontSize: 17,
        color: colors.gray,
        fontFamily: fonts.inter_500,
    },
    bold: {
        fontFamily: fonts.inter_600,
    },
    button: {
        marginVertical: 20,
    },
});
