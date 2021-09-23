import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

interface ImgCardProps {
    imgUri: string;
    isSelected: boolean;
}

export const ImgCard: React.FC<ImgCardProps> = ({ imgUri, isSelected }) => {
    return (
        <View>
            <Image
                source={{ uri: imgUri }}
                style={[
                    styles.img,
                    isSelected
                        ? { borderColor: theme.turqoise, borderWidth: 3 }
                        : {},
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
        borderRadius: 3,
        marginHorizontal: 2,
    },
});
