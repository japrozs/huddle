import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputField } from "../../components/InputField";
import { useCreateEventMutation } from "../../generated/graphql";
import { fonts, globalStyles } from "../../theme";
import { errorToMap } from "../../utils/errorToMap";
import { MainStackNav } from "./MainNav";

interface NewEventProps {}

interface ErrorProps {
    name?: string;
    tagLine?: string;
    desc?: string;
}

export const NewEvent: React.FC<MainStackNav<"NewEvent">> = ({
    navigation,
}) => {
    const [name, setName] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [desc, setDesc] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({});
    const [createEvent] = useCreateEventMutation();
    const client = useApolloClient();

    const submit = async () => {
        const res = await createEvent({
            variables: {
                name,
                tagLine,
                desc,
            },
        });
        if (res.data?.createEvent.errors) {
            return setErrors(errorToMap(res.data?.createEvent.errors));
        }
        await client.resetStore();
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create new event</Text>
            <InputField
                errors={errors}
                name={"name"}
                value={name}
                setter={setName}
                title={"Name"}
                placeholder={"Name"}
            />
            <InputField
                errors={errors}
                name={"tagLine"}
                value={tagLine}
                setter={setTagLine}
                title={"Tag Line"}
                placeholder={"Tag Line"}
            />
            <InputField
                errors={errors}
                name={"desc"}
                value={desc}
                setter={setDesc}
                title={"Description"}
                placeholder={"Description"}
            />
            <View style={{ marginTop: 100 }}></View>
            <TouchableOpacity onPress={submit} style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Create new event</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    heading: {
        fontSize: 28,
        fontFamily: fonts.inter_700,
    },
});
