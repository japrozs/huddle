import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "./main/MainNav";
import { Main } from "./main/Main";
import { SelfProfileStack } from "./main/SelfProfileStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, fonts, layout, theme } from "../theme";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useApolloClient } from "@apollo/client";
import { ProfileImage } from "../components/ProfileImage";
import { Search } from "./main/Search";

interface MainStackProps {}

// const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStack: React.FC<MainStackProps> = ({}) => {
    const { data, loading } = useMeQuery();
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{
                headerTitleStyle: {
                    color: colors.textColor,
                    fontFamily: fonts.inter_600,
                },
                tabBarStyle: {
                    backgroundColor: colors.backgroundColor,
                    borderColor: theme.borderColor,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.navigation.active,
                tabBarInactiveTintColor: colors.navigation.inActive,
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name="home"
                            size={layout.iconSize}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
                }}
                name="Home"
                component={Main}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="search1"
                            size={layout.iconSize}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
                }}
                name="Search"
                component={Search}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[
                                {
                                    borderColor: colors.inputBorder,
                                    borderWidth: 1,
                                    borderRadius: layout.borderRadius,
                                },
                                focused
                                    ? {
                                          borderColor: colors.navigation.active,
                                      }
                                    : {
                                          borderColor:
                                              colors.navigation.inActive,
                                      },
                            ]}
                        >
                            <ProfileImage
                                imgUrl={data?.me?.imgUrl}
                                variant={"icon"}
                            />
                        </View>
                    ),
                }}
                name="SelfProfile"
                component={SelfProfileStack}
            />
        </Tab.Navigator>
    );
};
