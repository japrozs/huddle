import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fonts, globalStyles, layout, theme } from "../../theme";
import { EvilIcons } from "@expo/vector-icons";

interface OptionCardProps {
    title: string;
    onPress: any;
    style?: object;
    action?: true;
}

export const OptionCard: React.FC<OptionCardProps> = ({
    title,
    onPress,
    style,
    action,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[globalStyles.flex, styles.container, style]}
        >
            <Text style={[styles.title, action ? { color: theme.red } : {}]}>
                {title}
            </Text>
            <EvilIcons
                name="chevron-right"
                size={layout.iconSize + 14}
                color={theme.gray}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 13,
        borderColor: theme.borderColor,
        borderBottomWidth: 1,
        paddingRight: 0,
        backgroundColor: theme.backgroundColor,
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.inter_600,
        color: theme.gray,
    },
    icon: {
        marginLeft: "auto",
        marginRight: 0,
    },
});
