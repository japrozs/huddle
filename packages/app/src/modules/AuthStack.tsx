import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthStackParamList } from "./auth/AuthNav";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { colors, fonts, theme } from "../theme";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    borderBottomColor: theme.borderColor,
                    borderBottomWidth: 0.2,
                },
                headerTintColor: colors.textColor,
                headerTitleStyle: {
                    color: theme.textColor,
                    fontFamily: fonts.inter_600,
                },
            }}
            initialRouteName={"Login"}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Login",
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Register",
                }}
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
};
