import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
    return (
        <View>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
