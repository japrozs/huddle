import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type HomeNavParamList = {
    HomePage: undefined;
    PostPage: {
        id: number;
    };
    EventPage: {
        id: number;
        name: string;
    };
    CreatePost: undefined;
    UserPage: {
        id: number;
        name: string;
    };
};

export type HomeStackNav<RouteName extends keyof HomeNavParamList> = {
    navigation: BottomTabNavigationProp<HomeNavParamList, RouteName>;
    route: RouteProp<HomeNavParamList, RouteName>;
};
