import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useMeQuery } from "./generated/graphql";
import { AuthStack } from "./modules/AuthStack";
import { MainStack } from "./modules/MainStack";
import { colors } from "./theme";

interface RoutesProps {}

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
        >
            {body}
        </NavigationContainer>
    );
};
