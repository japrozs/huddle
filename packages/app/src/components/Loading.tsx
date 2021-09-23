import React from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { theme } from "../theme";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={theme.grayDark} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
        justifyContent: "center",
    },
});
