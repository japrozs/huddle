import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type SettingsNavParamList = {
    SettingsMainPage: undefined;
    AccountData: undefined;
    PrivacyPolicy: undefined;
};

export type SettingsStackNav<RouteName extends keyof SettingsNavParamList> = {
    navigation: BottomTabNavigationProp<SettingsNavParamList, RouteName>;
    route: RouteProp<SettingsNavParamList, RouteName>;
};
