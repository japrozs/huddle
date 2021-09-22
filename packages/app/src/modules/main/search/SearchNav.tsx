import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type SearchNavParamList = {
    SearchPage: undefined;
    EventPage: {
        id: number;
        name: string;
    };
    CreatePost: {
        id: number;
        imgUrl: string;
        name: string;
    };
    UserPage: {
        id: number;
        name: string;
    };
    PostPage: {
        id: number;
    };
};

export type SearchStackNav<RouteName extends keyof SearchNavParamList> = {
    navigation: BottomTabNavigationProp<SearchNavParamList, RouteName>;
    route: RouteProp<SearchNavParamList, RouteName>;
};
