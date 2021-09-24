import React, { useState } from "react";
import { RefreshControl, SafeAreaView, FlatList, Text } from "react-native";
import { useGetPostsQuery, useMeQuery } from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { PostCard } from "../../../components/PostCard";

import { HomeStackNav } from "./HomeNav";
import { useApolloClient } from "@apollo/client";

interface HomePageProps {}

export const HomePage: React.FC<HomeStackNav<"PostPage">> = ({
    navigation,
}) => {
    const { data, loading } = useGetPostsQuery();
    const [refreshing, setRefreshing] = useState(false);
    const client = useApolloClient();
    return (
        <SafeAreaView>
            {data ? (
                <FlatList
                    data={data.getPosts}
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
                    refreshing={refreshing}
                    onRefresh={async () => {
                        await client.resetStore();
                    }}
                />
            ) : (
                <></>
            )}
            {!data && loading ? <Loading /> : <></>}
            {data && data?.getPosts.length == 0 ? (
                <Text>there are no posts</Text>
            ) : (
                <></>
            )}
        </SafeAreaView>
    );
};
