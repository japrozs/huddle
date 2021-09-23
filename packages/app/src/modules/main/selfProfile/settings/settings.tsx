import React from "react";
import { ScrollView, Text, View } from "react-native";
import { OptionCard } from "../../../../components/settings/OptionCard";
import { globalStyles } from "../../../../theme";
import { SettingsStackNav } from "./settingsNav";

interface settingsProps {}

export const SettingsMainPage: React.FC<SettingsStackNav<"SettingsMainPage">> =
    ({ navigation }) => {
        return (
            <ScrollView>
                <OptionCard title={"Privacy Policy"} onPress={() => {}} />
                <OptionCard
                    title={"Account Data"}
                    onPress={() => {
                        navigation.navigate("AccountData");
                    }}
                />
                <OptionCard title={"History"} onPress={() => {}} />
                <OptionCard title={"Security"} onPress={() => {}} />
                <OptionCard title={"Breaches"} onPress={() => {}} />
                <Text style={[globalStyles.heading, { padding: 13 }]}>
                    ACTIONS
                </Text>
                <OptionCard
                    title={"Delete account"}
                    onPress={() => {}}
                    style={{ borderTopWidth: 1 }}
                    action={true}
                />
                <OptionCard
                    title={"Deactivate account"}
                    onPress={() => {}}
                    action={true}
                />
            </ScrollView>
        );
    };
