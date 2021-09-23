import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavParamList } from "./Home/HomeNav";
import { HomePage } from "./Home/HomePage";
import { colors, constants, fonts, layout, theme } from "../../theme";
import Svg, { Circle, Mask, Path } from "react-native-svg";
import { Image, StyleSheet, View } from "react-native";
import { useMeQuery } from "../../generated/graphql";
import { ProfileImage } from "../../components/ProfileImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PostPage } from "../shared/PostPage";
import { UserPage } from "../shared/UserPage";
import { EventPage } from "../shared/EventPage";
import { CreatePost } from "../shared/CreatePost";

interface MainProps {}
const Stack = createStackNavigator<HomeNavParamList>();

export const Main: React.FC<MainProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    color: colors.textColor,
                    fontFamily: fonts.inter_600,
                },
                headerBackTitle: "Back",
            }}
        >
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTitle: "",
                    headerLeft: () => (
                        <Image
                            style={styles.headerImg}
                            source={require("../../../assets/icons/huddle.png")}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                borderColor: theme.borderColor,
                                borderWidth: 0.8,
                                marginRight: 10,
                                borderRadius: 28,
                            }}
                            onPress={() => {
                                navigation.getParent().navigate("SelfProfile");
                            }}
                        >
                            <ProfileImage
                                imgUrl={data?.me?.imgUrl}
                                variant={"comment"}
                            />
                        </TouchableOpacity>
                    ),
                })}
                name="HomePage"
                component={HomePage}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Post",
                }}
                name={"PostPage"}
                component={PostPage}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                })}
                name={"UserPage"}
                component={UserPage}
            />
            <Stack.Screen
                options={{
                    headerTitle: "New Post",
                }}
                name={"CreatePost"}
                component={CreatePost}
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
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerImg: {
        height: 35,
        width: 90,
        marginLeft: 10,
        alignSelf: "center",
    },
});
