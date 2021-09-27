import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputField } from "../../components/InputField";
import { useLoginMutation } from "../../generated/graphql";
import { fonts, globalStyles, theme } from "../../theme";
import { errorToMap } from "../../utils/errorToMap";
import Constants from "expo-constants";
import { AuthStackNav } from "./AuthNav";

interface LoginProps {}
interface ErrorProps {
    usernameOrEmail?: string;
    password?: string;
}

export const Login: React.FC<AuthStackNav<"Login">> = ({ navigation }) => {
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
            <View
                style={[
                    globalStyles.flex,
                    { alignSelf: "center", marginTop: 12 },
                ]}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: fonts.inter_500,
                        color: theme.gray,
                    }}
                >
                    Dont have an account?{" "}
                </Text>
                <Text
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                    style={{
                        fontSize: 16,
                        fontFamily: fonts.inter_600,
                        color: theme.gray,
                    }}
                >
                    Register
                </Text>
            </View>
            <Text
                onPress={() => {
                    navigation.navigate("ForgotPassword");
                }}
                style={{
                    fontSize: 16,
                    fontFamily: fonts.inter_600,
                    color: theme.gray,
                    alignSelf: "flex-end",
                    position: "absolute",
                    bottom: 90,
                    right: 13,
                }}
            >
                Forgot password?
            </Text>
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
        padding: 15,
        height: "100%",
    },
    button: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        marginBottom: Constants.statusBarHeight,
    },
});
