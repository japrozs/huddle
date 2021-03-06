import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    Image,
} from "react-native";
import constants from "expo-constants";
import { colors, layout, globalStyles, fonts } from "../../../theme";
import { AntDesign } from "@expo/vector-icons";
import { search } from "../../../utils/search";
import {
    useGetAllEventsLazyQuery,
    useGetAllEventsQuery,
    useGetAllUsersQuery,
} from "../../../generated/graphql";
import { ResultCard } from "../../../components/ResultCard";
import { SearchStackNav } from "./SearchNav";

interface SearchPageProps {}

export const SearchPage: React.FC<SearchStackNav<"SearchPage">> = ({
    navigation,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: allEvents } = useGetAllEventsQuery();
    const { data: allUsers } = useGetAllUsersQuery();
    return (
        <View style={styles.container}>
            <View style={[styles.searchBar, globalStyles.flex]}>
                <AntDesign
                    name="search1"
                    size={layout.iconSize - 6}
                    styles={styles.icon}
                />
                <TextInput
                    value={searchQuery}
                    onChangeText={(t) => setSearchQuery(t)}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder={"Search"}
                />
            </View>
            {searchQuery.trim().length == 0 ? (
                <Image
                    style={{
                        width: 350,
                        height: 350,
                        alignSelf: "center",
                        marginTop: 100,
                    }}
                    source={require("../../../../assets/empty/type_search_box.png")}
                />
            ) : (
                <></>
            )}
            {searchQuery.trim().length != 0 ? (
                <>
                    <Text
                        style={[
                            globalStyles.heading,
                            { paddingLeft: 15, marginTop: 10 },
                        ]}
                    >
                        RESULTS
                    </Text>
                    {search(searchQuery, allEvents, allUsers).map((res) => (
                        <ResultCard
                            navigation={navigation}
                            key={res.id}
                            result={res}
                        />
                    ))}
                    {search(searchQuery, allEvents, allUsers).length == 0 ? (
                        <Image
                            style={{
                                width: 300,
                                height: 300,
                                alignSelf: "center",
                                marginTop: 100,
                            }}
                            source={require("../../../../assets/empty/no_search_results.png")}
                        />
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <></>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: constants.statusBarHeight,
        maxWidth: Dimensions.get("screen").width,
    },
    searchBar: {
        backgroundColor: colors.inputBackgroundColor,
        padding: 15,
    },
    icon: {
        color: colors.buttonBackgroundColor,
    },
    input: {
        marginLeft: 10,
        height: "100%",
        width: "100%",
        color: colors.buttonBackgroundColor,
        fontSize: 18,
        fontFamily: fonts.inter_500,
    },
});
