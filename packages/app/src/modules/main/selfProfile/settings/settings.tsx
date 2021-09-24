import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { OptionCard } from "../../../../components/settings/OptionCard";
import { fonts, globalStyles, theme } from "../../../../theme";
import { SettingsStackNav } from "./settingsNav";
import constants from "expo-constants";

interface settingsProps {}

export const HuddleFooter = () => {
    return (
        <>
            <Image
                source={require("../../../../../assets/icons/huddle.png")}
                style={{
                    width: 70,
                    height: 30,
                    alignSelf: "center",
                    margin: 0,
                }}
            />
            <View style={[globalStyles.flex, { justifyContent: "center" }]}>
                <Text
                    style={{
                        color: theme.headingColor,
                        fontFamily: fonts.inter_500,
                        margin: 0,
                    }}
                >
                    huddle{" "}
                </Text>
                <Text
                    style={{
                        color: theme.headingColor,
                        fontFamily: fonts.inter_600,
                        margin: 0,
                    }}
                >
                    v{constants.manifest?.version}
                </Text>
            </View>
        </>
    );
};

export const SettingsMainPage: React.FC<SettingsStackNav<"SettingsMainPage">> =
    ({ navigation }) => {
        return (
            <View style={{ height: "100%" }}>
                <ScrollView>
                    <OptionCard
                        title={"Privacy Policy"}
                        onPress={() => {
                            navigation.navigate("PrivacyPolicy");
                        }}
                    />
                    <OptionCard
                        title={"Account Data"}
                        onPress={() => {
                            navigation.navigate("AccountData");
                        }}
                    />
                    <OptionCard title={"History"} onPress={() => {}} />
                    <OptionCard title={"Security"} onPress={() => {}} />
                    <OptionCard title={"FAQs"} onPress={() => {}} />
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
                <HuddleFooter />
            </View>
        );
    };
