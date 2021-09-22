import React from "react";
import { Text, View } from "react-native";
import { SelfProfileStackParamList } from "./selfProfile/selfProfileNav";
import { SelfProfile } from "./selfProfile/SelfProfile";
import { createStackNavigator } from "@react-navigation/stack";
import { PostPage } from "../shared/PostPage";
import { EventPage } from "../shared/EventPage";
import { colors, fonts } from "../../theme";

interface SelfProfileProps {}

const Stack = createStackNavigator<SelfProfileStackParamList>();

export const SelfProfileStack: React.FC<SelfProfileProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fff",
                    borderBottomColor: colors.inputBorder,
                    borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                    fontFamily: fonts.inter_600,
                    fontSize: 20,
                },
            }}
        >
            <Stack.Screen
                name="SelfProfilePage"
                options={{
                    headerTitle: "Profile",
                }}
                component={SelfProfile}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                })}
                name="EventPage"
                component={EventPage}
            />
            <Stack.Screen name={"PostPage"} component={PostPage} />
        </Stack.Navigator>
    );
};
