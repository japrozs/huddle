import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { InputField } from "../../components/InputField";
import { globalStyles, theme } from "../../theme";
import Constants from "expo-constants";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { AuthStackNav } from "./AuthNav";

interface ForgotPasswordProps {}

interface ErrorProps {
    email?: string;
}

export const ForgotPassword: React.FC<AuthStackNav<"ForgotPassword">> = ({
    navigation,
}) => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({});
    const [forgotPassword, { loading }] = useForgotPasswordMutation();

    const submit = async () => {
        await forgotPassword({
            variables: {
                email,
            },
        });

        await navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <InputField
                name={"email"}
                placeholder={"Email"}
                value={email}
                title={"Email"}
                setter={setEmail}
                errors={errors}
            />
            {!loading ? (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={submit}
                    style={[globalStyles.button, styles.button]}
                >
                    <Text style={globalStyles.buttonText}>Send Email</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 13,
        height: "100%",
    },
    button: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        marginBottom: Constants.statusBarHeight,
    },
});
