import React, {
    LegacyRef,
    MutableRefObject,
    RefObject,
    useRef,
    useState,
} from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { InputField } from "../../components/InputField";
import { globalStyles, fonts, theme } from "../../theme";
import Constants from "expo-constants";
import { AuthStackNav } from "./AuthNav";
import { useRegisterMutation } from "../../generated/graphql";
import { errorToMap } from "../../utils/errorToMap";
import { useApolloClient } from "@apollo/client";

interface RegisterProps {}

interface ErrorProps {
    username?: string;
    name?: string;
    email?: string;
    password?: string;
}

export const Register: React.FC<AuthStackNav<"Register">> = ({
    navigation,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({});
    const [registerMut] = useRegisterMutation();
    const client = useApolloClient();

    const register = async () => {
        const res = await registerMut({
            variables: {
                options: {
                    name,
                    email,
                    password,
                    username,
                },
            },
        });

        if (res.data?.register.errors) {
            return setErrors(errorToMap(res.data?.register.errors));
        }
        await client.resetStore();
    };

    return (
        <ScrollView style={styles.container}>
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
                name={"email"}
                placeholder={"Email"}
                value={email}
                title={"Email"}
                setter={setEmail}
                errors={errors}
            />
            <InputField
                name={"password"}
                placeholder={"Password"}
                value={password}
                title={"Password"}
                setter={setPassword}
                errors={errors}
                secureTextEntry={true}
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
                    Already have an account?{" "}
                </Text>
                <Text
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                    style={{
                        fontSize: 16,
                        fontFamily: fonts.inter_600,
                        color: theme.gray,
                    }}
                >
                    Login
                </Text>
            </View>
            <TouchableOpacity
                onPress={register}
                style={[globalStyles.button, styles.button]}
            >
                <Text style={globalStyles.buttonText}>Register</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: "100%",
    },
    button: {
        marginTop: 30,
        alignSelf: "center",
        marginBottom: Constants.statusBarHeight,
    },
});
