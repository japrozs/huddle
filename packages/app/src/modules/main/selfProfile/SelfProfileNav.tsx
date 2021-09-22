import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type SelfProfileStackParamList = {
    SelfProfilePage: undefined;
    EventPage: {
        id: number;
        name: string;
    };
    CreatePost: undefined;
    PostPage: {
        id: number;
    };
};

export type SelfProfileStackNav<
    RouteName extends keyof SelfProfileStackParamList
> = {
    navigation: BottomTabNavigationProp<SelfProfileStackParamList, RouteName>;
    route: RouteProp<SelfProfileStackParamList, RouteName>;
};
