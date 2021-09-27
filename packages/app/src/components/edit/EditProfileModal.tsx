import { AntDesign, Entypo } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    GetUserQuery,
    GetUserQueryResult,
    useUpdateProfileMutation,
} from "../../generated/graphql";
import { fonts, globalStyles, layout, theme } from "../../theme";
import { InputField } from "../InputField";
import { ProfileImage } from "../ProfileImage";
import * as ImagePicker from "expo-image-picker";
import { useApolloClient } from "@apollo/client";
import axios from "axios";

interface EditProfileModalProps {
    modalVisible: boolean;
    setModalVisible: any;
    data: GetUserQuery;
}

interface ErrorProps {
    username?: string;
    name?: string;
    bio?: string;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
    modalVisible,
    setModalVisible,
    data,
}) => {
    const { getUser: user } = data;
    const [photoUri, setPhotoUri] = useState(user.imgUrl);
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [errors, setErrors] = useState<ErrorProps>({});
    const [updateProfileMut, { loading }] = useUpdateProfileMutation();
    const client = useApolloClient();

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
    };
    const submit = async () => {
        if (photoUri != user.imgUrl) {
            const formData = new FormData();
            const file = {
                uri: photoUri,
                type: "image/jpg",
                name: "photo-pic",
            };
            // @ts-ignore
            formData.append("file", file);
            formData.append("userId", user.id.toString());
            try {
                const res = await axios.post(
                    "http://192.168.1.5:4000/upload-profile",
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
        await updateProfileMut({
            variables: {
                name,
                bio,
                username,
            },
        });
        await client.resetStore();
        setModalVisible(false);
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
                    <Text style={styles.heading}>Edit details</Text>
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
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            borderRadius: 55,
                            borderColor: theme.borderColor,
                            borderWidth: 1,
                            overflow: "hidden",
                        }}
                    >
                        <ProfileImage imgUrl={photoUri} variant={"regular"} />
                    </TouchableOpacity>
                </View>
                <InputField
                    name={"name"}
                    placeholder={"Name"}
                    value={name}
                    title={"Name"}
                    setter={setName}
                    errors={errors}
                />
                <InputField
                    name={"username"}
                    placeholder={"Username"}
                    value={username}
                    title={"Username"}
                    setter={setUsername}
                    errors={errors}
                />
                <InputField
                    name={"bio"}
                    placeholder={"Bio"}
                    value={bio}
                    title={"Bio"}
                    setter={setBio}
                    errors={errors}
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
