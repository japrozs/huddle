import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, fonts, globalStyles } from "../theme";
import { truncate } from "../utils/truncate";

interface EventCardProps {
    event: {
        __typename?: "Event" | undefined;
        id: number;
        name: string;
        imgUrl: string;
        tagLine: string;
    };
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <View style={styles.eventCard}>
            <View style={globalStyles.flex}>
                <Image style={styles.imgEvent} source={{ uri: event.imgUrl }} />
                <View
                    style={{
                        marginLeft: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#000",
                            fontSize: 20,
                            fontWeight: "500",
                            fontFamily: fonts.inter_600,
                        }}
                    >
                        {event.name}
                    </Text>
                    <Text
                        style={{
                            color: "#2e2e2e",
                            fontWeight: "400",
                            fontSize: 16,
                            fontFamily: fonts.inter_500,
                            marginTop: 2,
                        }}
                    >
                        {truncate(event.tagLine, 25)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imgEvent: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    eventCard: {
        marginTop: 10,
        backgroundColor: colors.lightBackground,
        padding: 15,
        borderColor: colors.lightBackground,
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 10,
    },
});
