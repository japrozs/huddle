import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Alert,
    Pressable,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Dimensions,
} from "react-native";
import { fonts, globalStyles, layout, theme } from "../../theme";
import { Entypo } from "@expo/vector-icons";
import {
    Event,
    GetEventQueryResult,
    useUpdateEventMutation,
} from "../../generated/graphql";
import { InputField } from "../InputField";
import { useApolloClient } from "@apollo/client";
import { ProfileImage } from "../ProfileImage";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

interface EditEventModalProps {
    modalVisible: boolean;
    setModalVisible: any;
    event: any;
}

interface ErrorProps {
    name?: string;
    desc?: string;
    tagLine?: string;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
    modalVisible,
    setModalVisible,
    event,
}) => {
    const [name, setName] = useState(event?.name);
    const [tagLine, setTagLine] = useState(event?.tagLine);
    const [description, setDescription] = useState(event?.description);
    const [errors, setErrors] = useState<ErrorProps>({});
    const [photoUri, setPhotoUri] = useState(event?.imgUrl);
    const [updateEventMut, { loading }] = useUpdateEventMutation();
    const client = useApolloClient();

    const submit = async () => {
        if (photoUri != event?.imgUrl) {
            const formData = new FormData();
            const file = {
                uri: photoUri,
                type: "image/jpg",
                name: "photo-pic",
            };
            // @ts-ignore
            formData.append("file", file);
            formData.append("eventId", event?.id.toString());
            try {
                const res = await axios.post(
                    "http://192.168.1.5:4000/upload-event",
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
        await updateEventMut({
            variables: {
                eventId: event?.id,
                name,
                tagLine,
                desc: description,
            },
        });
        await client.resetStore();
        setModalVisible(false);
    };

    const pickImage = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status != "granted") {
            await Camera.getCameraPermissionsAsync();
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (imageResult.cancelled) {
            alert("Image upload was interrupted in between");
            return;
        }
        const { uri } = imageResult;
        setPhotoUri(uri);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <ScrollView style={styles.modalView}>
                <View style={globalStyles.flex}>
                    <Text style={styles.heading}>Edit Details</Text>
                    <AntDesign
                        name="close"
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{ marginLeft: "auto", marginRight: 0 }}
                        size={layout.iconSize - 2}
                        color={theme.gray}
                    />
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 12,
                    }}
                >
                    <TouchableOpacity onPress={pickImage}>
                        <ProfileImage imgUrl={photoUri} variant={"regular"} />
                    </TouchableOpacity>
                </View>
                <InputField
                    errors={errors}
                    name={"name"}
                    setter={setName}
                    title={"Name"}
                    value={name}
                />
                <InputField
                    errors={errors}
                    name={"tagLine"}
                    setter={setTagLine}
                    title={"Tag Line"}
                    value={tagLine}
                />
                <InputField
                    errors={errors}
                    name={"desc"}
                    value={description}
                    setter={setDescription}
                    title={"Description"}
                    placeholder={"Description"}
                />
                {!loading ? (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={submit}
                        style={[globalStyles.button, styles.button]}
                    >
                        <Text style={globalStyles.buttonText}>
                            Update event
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[globalStyles.button, styles.button]}
                    >
                        <ActivityIndicator
                            size={"large"}
                            color={theme.backgroundColor}
                        />
                    </TouchableOpacity>
                )}
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: theme.backgroundColor,
        height: "100%",
        padding: 10,
    },
    heading: {
        fontSize: 25,
        fontFamily: fonts.inter_700,
    },
    button: {
        marginTop: 30,
    },
});
