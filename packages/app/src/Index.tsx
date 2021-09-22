import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from "@expo-google-fonts/inter";
import { Loading } from "./components/Loading";
import { Routes } from "./Routes";

interface IndexProps {}

const client = new ApolloClient({
    uri: "http://192.168.1.5:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

export const Index: React.FC<IndexProps> = () => {
    const [fontsLoaded] = useFonts({
        "Inter 100": Inter_100Thin,
        "Inter 200": Inter_200ExtraLight,
        "Inter 300": Inter_300Light,
        "Inter 400": Inter_400Regular,
        "Inter 500": Inter_500Medium,
        "Inter 600": Inter_600SemiBold,
        "Inter 700": Inter_700Bold,
        "Inter 800": Inter_800ExtraBold,
        "Inter 900": Inter_900Black,
    });

    if (!fontsLoaded) {
        return <Loading />;
    }
    return (
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    );
};
