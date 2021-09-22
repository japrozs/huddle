import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface ImgCardProps {
    imgUri: string;
}

export const ImgCard: React.FC<ImgCardProps> = ({ imgUri }) => {
    return (
        <View>
            <Image source={{ uri: imgUri }} style={styles.img} />
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
