import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SearchResult } from "../utils/search";
import {
    globalStyles,
    colors,
    layout,
    constants,
    fonts,
    theme,
} from "../theme";
import { MainStackParamList } from "../modules/Main/MainNav";
import { SearchNavParamList } from "../modules/Main/search/SearchNav";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ProfileImage } from "./ProfileImage";
import { truncate } from "../utils/truncate";

interface ResultCardProps {
    result: SearchResult;
    navigation: BottomTabNavigationProp<SearchNavParamList, "SearchPage">;
}

export const ResultCard: React.FC<ResultCardProps> = ({
    result,
    navigation,
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (result.type == "event") {
                    navigation.navigate("EventPage", {
                        id: result.id,
                        name: result.name,
                    });
                } else {
                    alert("id : " + result.id);
                    navigation.navigate("UserPage", {
                        id: result.id,
                        name: result.name,
                    });
                }
            }}
        >
            <View style={styles.container}>
                <View style={globalStyles.flex}>
                    <View
                        style={{
                            marginRight: 5,
                            borderColor: theme.borderColor,
                            borderWidth: 1,
                            borderRadius: 30,
                        }}
                    >
                        <ProfileImage
                            imgUrl={result.imgUrl}
                            variant={"search"}
                        />
                    </View>
                    {result.type == "event" ? (
                        <View
                            style={{
                                marginLeft: 10,
                            }}
                        >
                            <Text style={styles.eventName}>{result.name}</Text>
                            <Text style={styles.description}>
                                {truncate(result.tagLine || "", 30)}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.username}>{result.name}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingBottom: 0,
        backgroundColor: "#fff",
    },
    card: {
        paddingVertical: 12,
        marginBottom: 25,
    },
    time: {
        color: colors.buttonBackgroundColor,
        marginLeft: "auto",
        marginRight: 0,
        fontSize: 15,
        fontWeight: "600",
    },
    description: {
        color: colors.inputBorder,
        fontFamily: fonts.inter_500,
        marginTop: -3,
        fontSize: 16,
    },

    icon: {
        color: "#374151",
    },
    count: {
        paddingHorizontal: 6,
        fontWeight: "500",
    },
    username: {
        fontSize: 21,
        fontWeight: "500",
        marginLeft: 10,
        fontFamily: fonts.inter_600,
    },
    eventName: {
        fontSize: 18,
        color: "#000",
        fontFamily: fonts.inter_600,
        fontWeight: "600",
    },
});
