import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type SelfProfileStackParamList = {
    SelfProfilePage: undefined;
    EventPage: {
        id: number;
        name: string;
    };
    SettingsPage: undefined;
    CreatePost: {
        id: number;
        imgUrl: string;
        name: string;
    };
    PostPage: {
        id: number;
    };
    UserPage: {
        id: number;
        name: string;
    };
};

export type SelfProfileStackNav<
    RouteName extends keyof SelfProfileStackParamList
> = {
    navigation: BottomTabNavigationProp<SelfProfileStackParamList, RouteName>;
    route: RouteProp<SelfProfileStackParamList, RouteName>;
};
