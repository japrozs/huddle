import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type AuthStackNav<RouteName extends keyof AuthStackParamList> = {
    navigation: BottomTabNavigationProp<AuthStackParamList, RouteName>;
    route: RouteProp<AuthStackParamList, RouteName>;
};
