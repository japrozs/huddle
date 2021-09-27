import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useMeQuery } from "./generated/graphql";
import { AuthStack } from "./modules/AuthStack";
import { MainStack } from "./modules/MainStack";
import { colors } from "./theme";
import * as Linking from "expo-linking";

interface RoutesProps {}

const prefix = Linking.makeUrl("/");

const linking = {
    prefixes: [prefix],
    config: {
        screens: {
            tokens: "changePassword/:token",
        },
    },
};

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { data, loading } = useMeQuery();
    let body: any = null;
    if (!loading && data?.me != null) {
        body = <MainStack />;
    } else {
        body = <AuthStack />;
    }
    return (
        <NavigationContainer
            theme={{
                // @ts-ignore
                colors: {
                    background: colors.backgroundColor,
                },
            }}
            linking={linking}
        >
            {body}
        </NavigationContainer>
    );
};
