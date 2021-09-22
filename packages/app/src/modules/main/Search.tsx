import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchNavParamList } from "./search/SearchNav";
import { SearchPage } from "./search/SearchPage";
import { EventPage } from "../shared/EventPage";
import { UserPage } from "../shared/UserPage";
import { fonts, theme } from "../../theme";
import { PostPage } from "../shared/PostPage";
import { CreatePost } from "../shared/CreatePost";

interface SearchProps {}

const Stack = createStackNavigator<SearchNavParamList>();

export const Search: React.FC<SearchProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    color: theme.textColor,
                    fontFamily: fonts.inter_600,
                },
            }}
            initialRouteName={"SearchPage"}
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="SearchPage"
                component={SearchPage}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTitleStyle: {
                        fontFamily: fonts.inter_600,
                        fontSize: 20,
                    },
                })}
                name="EventPage"
                component={EventPage}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTitleStyle: {
                        fontFamily: fonts.inter_600,
                        fontSize: 20,
                    },
                })}
                name="UserPage"
                component={UserPage}
            />
            <Stack.Screen name={"PostPage"} component={PostPage} />
            <Stack.Screen
                name={"CreatePost"}
                options={{
                    headerTitle: "New Post",
                }}
                component={CreatePost}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
});
