import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputField } from "../../components/InputField";
import { useLoginMutation } from "../../generated/graphql";
import { fonts, globalStyles } from "../../theme";
import { errorToMap } from "../../utils/errorToMap";
import Constants from "expo-constants";

interface LoginProps {}
interface ErrorProps {
    usernameOrEmail?: string;
    password?: string;
}

export const Login: React.FC<LoginProps> = ({}) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({});
    const [loginMut] = useLoginMutation();
    const client = useApolloClient();

    const login = async () => {
        const res = await loginMut({
            variables: {
                usernameOrEmail,
                password,
            },
        });
        if (res.data?.login.errors) {
            return setErrors(errorToMap(res.data?.login.errors));
        }
        await client.resetStore();
    };

    return (
        <View style={styles.container}>
            <InputField
                name={"usernameOrEmail"}
                placeholder={"Username or Email"}
                value={usernameOrEmail}
                title={"Username or Email"}
                setter={setUsernameOrEmail}
                errors={errors}
            />
            <InputField
                secureTextEntry={true}
                name={"password"}
                placeholder={"Password"}
                value={password}
                title={"Password"}
                setter={setPassword}
                errors={errors}
            />
            <TouchableOpacity
                onPress={login}
                style={[globalStyles.button, styles.button]}
            >
                <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: "100%",
    },
    button: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        marginBottom: Constants.statusBarHeight,
    },
});
