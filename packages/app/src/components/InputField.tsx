import React, { InputHTMLAttributes } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import { colors, constants, fonts, theme } from "../theme";

type FieldProps = TextInputProps & {
    setter: (value: React.SetStateAction<string>) => void;
    errors: any;
    value: string;
    name: string;
    title: string;
};

export const InputField: React.FC<FieldProps> = ({
    setter,
    errors,
    value,
    name,
    title,
    ...props
}) => {
    return (
        <View>
            <Text style={styles.label}>{title}</Text>
            <TextInput
                {...props}
                value={value}
                placeholderTextColor={theme.borderColor}
                autoCapitalize={"none"}
                onChangeText={(t) => setter(t)}
                style={[
                    styles.input,
                    {
                        borderColor: errors.hasOwnProperty(name)
                            ? theme.red
                            : theme.borderColor,
                    },
                ]}
            />
            {errors.hasOwnProperty(name) ? (
                <Text style={styles.error}>{errors[name]}</Text>
            ) : (
                <></>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        borderWidth: 1.5,
        padding: 11,
        fontSize: 19,
        borderRadius: 5,
        width: constants.inputWidth,
        marginVertical: 7,
        fontFamily: fonts.inter_500,
        color: "#000",
        fontWeight: "500",
    },
    label: {
        color: theme.grayDark,
        fontFamily: fonts.inter_600,
        fontSize: 20,
        fontWeight: "600",
        marginTop: 20,
    },
    error: {
        color: colors.errorRed,
        fontSize: 16.5,
        fontFamily: fonts.inter_500,
    },
});
