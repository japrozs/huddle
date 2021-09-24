import React from "react";
import { Text, View } from "react-native";
import {
    SelfProfileStackNav,
    SelfProfileStackParamList,
} from "./selfProfile/selfProfileNav";
import { SelfProfile } from "./selfProfile/SelfProfile";
import { createStackNavigator } from "@react-navigation/stack";
import { PostPage } from "../shared/PostPage";
import { EventPage } from "../shared/EventPage";
import { colors, fonts, theme } from "../../theme";
import { UserPage } from "../shared/UserPage";
import { CreatePost } from "../shared/CreatePost";
import { settingsStack } from "./selfProfile/settings/settingsStack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLogoutMutation } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface SelfProfileProps {}

const Stack = createStackNavigator<SelfProfileStackParamList>();

export const SelfProfileStack: React.FC<SelfProfileProps> = ({}) => {
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
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
                options={({
                    navigation,
                }: SelfProfileStackNav<"SelfProfilePage">) => ({
                    headerLeft: () => (
                        <MaterialIcons
                            name="logout"
                            size={24 + 7}
                            style={{ marginLeft: 10 }}
                            color={theme.textColor}
                            onPress={async () => {
                                await logout();
                                await client.resetStore();
                            }}
                        />
                    ),
                    headerTitle: "",
                    headerRight: () => (
                        <Ionicons
                            name="md-settings-sharp"
                            size={24}
                            style={{ marginRight: 10 }}
                            color={theme.textColor}
                            onPress={() => {
                                navigation.navigate("SettingsPage");
                            }}
                        />
                    ),
                })}
                component={SelfProfile}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                })}
                name="EventPage"
                component={EventPage}
            />
            <Stack.Screen
                options={{
                    headerTitle: "New Post",
                }}
                name={"CreatePost"}
                component={CreatePost}
            />
            <Stack.Screen name={"PostPage"} component={PostPage} />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name={"SettingsPage"}
                component={settingsStack}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                })}
                name={"UserPage"}
                component={UserPage}
            />
        </Stack.Navigator>
    );
};
