import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputField } from "../../components/InputField";
import { useCreateEventMutation } from "../../generated/graphql";
import { fonts, globalStyles, theme } from "../../theme";
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
    const [isLoading, setIsLoading] = useState(false);

    const submit = async () => {
        setIsLoading(true);
        const res = await createEvent({
            variables: {
                name,
                tagLine,
                desc,
            },
        });
        if (res.data?.createEvent.errors) {
            setIsLoading(false);
            return setErrors(errorToMap(res.data?.createEvent.errors));
        }
        await client.resetStore();
        setIsLoading(false);
        navigation.navigate("Home");
    };

    return (
        <ScrollView style={styles.container}>
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
            {!isLoading ? (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={submit}
                    style={globalStyles.button}
                >
                    <Text style={globalStyles.buttonText}>
                        Create new event
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity activeOpacity={1} style={globalStyles.button}>
                    <ActivityIndicator
                        size={"large"}
                        color={theme.backgroundColor}
                    />
                </TouchableOpacity>
            )}
        </ScrollView>
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
