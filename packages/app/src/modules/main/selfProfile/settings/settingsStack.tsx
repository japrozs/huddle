import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { fonts, theme } from "../../../../theme";
import { SettingsMainPage } from "./settings";
import { SettingsNavParamList } from "./settingsNav";

interface settingsStackProps {}

const Stack = createStackNavigator<SettingsNavParamList>();

export const settingsStack: React.FC<settingsStackProps> = ({}) => {
    return (
        <Stack.Navigator
            initialRouteName={"SettingsMainPage"}
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fff",
                    borderBottomColor: theme.borderColor,
                    borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                    fontFamily: fonts.inter_600,
                    fontSize: 20,
                },
            }}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Settings",
                }}
                name={"SettingsMainPage"}
                component={SettingsMainPage}
            />
        </Stack.Navigator>
    );
};
