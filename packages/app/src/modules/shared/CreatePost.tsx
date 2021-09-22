import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
} from "react-native";
import { constants, fonts, globalStyles, layout, theme } from "../../theme";
import { SearchStackNav } from "../main/search/SearchNav";
import * as MediaLibrary from "expo-media-library";
import { ImgCard } from "../../components/ImgCard";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import expoConstants from "expo-constants";

interface CreatePostProps {}

type PropType = SearchStackNav<"CreatePost">;

export const CreatePost: React.FC<PropType> = ({ route }) => {
    const [focus, setFocus] = useState(false);
    const [photos, setPhotos] = useState<MediaLibrary.Asset[] | []>([]);
    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status != "granted") {
                await MediaLibrary.getPermissionsAsync();
            }
            console.log(status);
            if (status == "denied") {
                return;
            }

            const albumData = await MediaLibrary.getAssetsAsync({
                first: 10,
                sortBy: ["creationTime"],
                mediaType: "photo",
            });
            setPhotos(albumData.assets);
        })();
    }, []);
    const album = MediaLibrary;
    return (
        <View>
            <Image source={{ uri: route.params.imgUrl }} style={styles.img} />
            <View style={{ padding: 10 }}>
                <Text style={styles.heading}>Create new post</Text>
                <View style={[globalStyles.flex, { padding: 0, margin: 0 }]}>
                    <Text style={styles.subHeading}>in</Text>
                    <Text
                        style={[
                            styles.subHeading,
                            { fontFamily: fonts.inter_600 },
                        ]}
                    >
                        {" "}
                        {route.params.name}
                    </Text>
                </View>
                <Text style={styles.label}>Post Body</Text>
                <TextInput
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    placeholder={"Post body"}
                    style={[styles.input, focus ? { borderColor: "#000" } : {}]}
                />
                <ScrollView horizontal={true} style={{ marginTop: 40 }}>
                    <View style={styles.galleryPicker}>
                        <MaterialIcons
                            name="camera-alt"
                            size={layout.iconSize + 10}
                            color={theme.backgroundColor}
                        />
                    </View>
                    {photos.map((photo) => (
                        <ImgCard key={photo.id} imgUri={photo.uri} />
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={[globalStyles.button, { marginTop: 100 }]}
                >
                    <Text style={globalStyles.buttonText}>Create post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        width: Dimensions.get("screen").width,
        height: 100,
    },
    heading: {
        fontSize: 28,
        fontFamily: fonts.inter_700,
    },
    subHeading: {
        fontSize: 17,
        color: theme.gray,
        fontFamily: fonts.inter_500,
    },
    label: {
        marginTop: 20,
        fontSize: 18,
        fontFamily: fonts.inter_600,
        color: theme.grayDark,
    },
    input: {
        borderRadius: 3,
        borderColor: theme.borderColor,
        borderWidth: 1,
        padding: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        fontFamily: fonts.inter_500,
        marginTop: 10,
    },
    galleryPicker: {
        backgroundColor: theme.black,
        width: 60,
        height: 60,
        borderRadius: 3,
        marginHorizontal: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});
