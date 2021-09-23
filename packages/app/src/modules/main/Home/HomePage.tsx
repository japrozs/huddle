import React, { useState } from "react";
import { RefreshControl, SafeAreaView, FlatList } from "react-native";
import { useGetPostsQuery, useMeQuery } from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { PostCard } from "../../../components/PostCard";

import { HomeStackNav } from "./HomeNav";

interface HomePageProps {}

export const HomePage: React.FC<HomeStackNav<"PostPage">> = ({
    navigation,
}) => {
    const { data, loading } = useGetPostsQuery();
    const [refreshing, setRefreshing] = useState(false);
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
                />
            ) : (
                <></>
            )}
            {!data && loading ? <Loading /> : <></>}
        </SafeAreaView>
    );
};
