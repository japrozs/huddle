import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useGetPostsQuery, useMeQuery } from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { PostCard } from "../../../components/PostCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HomeStackNav } from "./HomeNav";

interface HomePageProps {}

export const HomePage: React.FC<HomeStackNav<"PostPage">> = ({
    navigation,
}) => {
    const { data, loading } = useGetPostsQuery();
    return (
        <ScrollView>
            {data ? (
                data.getPosts.map((post) => (
                    <TouchableOpacity
                        activeOpacity={1}
                        key={post.id}
                        onPress={() => {
                            navigation.navigate("PostPage", {
                                id: post.id,
                            });
                        }}
                    >
                        <PostCard post={post} />
                    </TouchableOpacity>
                ))
            ) : (
                <></>
            )}
        </ScrollView>
    );
};
