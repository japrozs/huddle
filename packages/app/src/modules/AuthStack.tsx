import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthStackParamList } from "./auth/AuthNav";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { colors, fonts, theme } from "../theme";
import { ForgotPassword } from "./auth/ForgotPassword";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
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
            <Stack.Screen
                options={{
                    headerTitle: "Forgot Password",
                }}
                name="ForgotPassword"
                component={ForgotPassword}
            />
        </Stack.Navigator>
    );
};
