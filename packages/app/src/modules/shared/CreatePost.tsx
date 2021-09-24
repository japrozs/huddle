import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { fonts, globalStyles, layout, theme } from "../../theme";
import { SearchStackNav } from "../main/search/SearchNav";
import * as MediaLibrary from "expo-media-library";
import { ImgCard } from "../../components/ImgCard";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useApolloClient } from "@apollo/client";
import axios from "axios";
import { HomeStackNav } from "../main/Home/HomeNav";
import { useCreatePostMutation } from "../../generated/graphql";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

interface CreatePostProps {}

type PropType = SearchStackNav<"CreatePost"> | HomeStackNav<"CreatePost">;

export const CreatePost: React.FC<PropType> = ({ route, navigation }) => {
    const [focus, setFocus] = useState(false);
    const [photos, setPhotos] = useState<MediaLibrary.Asset[] | []>([]);
    const [photoUri, setPhotoUri] = useState("");
    const [body, setBody] = useState("");
    const client = useApolloClient();
    const [createPost] = useCreatePostMutation();
    const [isLoading, setIsLoading] = useState(false);

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

    const pickImage = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status != "granted") {
            await Camera.getCameraPermissionsAsync();
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
        });
        if (imageResult.cancelled) {
            alert("Image upload was interrupted in between");
            return;
        }
        const { uri } = imageResult;
        setPhotoUri(uri);
        setPhotos([imageResult as unknown as MediaLibrary.Asset, ...photos]);
    };

    const submit = async () => {
        if (body.trim().length == 0) {
            return;
        }
        setIsLoading(true);
        if (photoUri.trim().length == 0) {
            const res = await createPost({
                variables: {
                    body,
                    eventId: route.params.id,
                },
            });
        } else {
            const formData = new FormData();
            const file = {
                uri: photoUri,
                type: "image/jpg",
                name: "photo-pic",
            };
            // @ts-ignore
            formData.append("file", file);
            formData.append("body", body);
            formData.append("eventId", route.params.id.toString());
            try {
                const res = await axios.post(
                    "http://192.168.1.5:4000/upload",
                    formData,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("here");
            } catch (err) {
                console.log(err);
            }
        }

        setIsLoading(false);
        // @ts-ignore
        navigation.navigate("EventPage", {
            id: route.params.id,
            name: route.params.name,
        });
        await client.resetStore();
    };

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
                    value={body}
                    onChangeText={(t) => setBody(t)}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    placeholder={"Post body"}
                    style={[styles.input, focus ? { borderColor: "#000" } : {}]}
                />
                <ScrollView horizontal={true} style={{ marginTop: 40 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
                        <View style={styles.galleryPicker}>
                            <MaterialIcons
                                name="camera-alt"
                                size={layout.iconSize + 10}
                                color={theme.backgroundColor}
                            />
                        </View>
                    </TouchableOpacity>
                    {photos.map((photo) => (
                        <TouchableOpacity
                            key={photo.id}
                            activeOpacity={1}
                            onPress={() => {
                                setPhotoUri(photo.uri);
                            }}
                        >
                            <ImgCard
                                imgUri={photo.uri}
                                isSelected={photoUri == photo.uri}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {!isLoading ? (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={submit}
                        style={[globalStyles.button, { marginTop: 100 }]}
                    >
                        <Text style={globalStyles.buttonText}>Create post</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[globalStyles.button, { marginTop: 100 }]}
                    >
                        <ActivityIndicator
                            size={"large"}
                            color={theme.backgroundColor}
                        />
                    </TouchableOpacity>
                )}
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
