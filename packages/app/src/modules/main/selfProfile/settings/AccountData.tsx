import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useMeQuery } from "../../../../generated/graphql";
import { fonts, globalStyles, theme } from "../../../../theme";

interface AccountDataProps {}

export const AccountData: React.FC<AccountDataProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <ScrollView style={styles.container}>
            <View style={[globalStyles.flex, styles.row]}>
                <Text style={globalStyles.heading}>ID</Text>
                <Text style={[styles.value, { fontFamily: fonts.menlo }]}>
                    {data?.me?.id}
                </Text>
            </View>
            <View style={[globalStyles.flex, styles.row]}>
                <Text style={globalStyles.heading}>NAME</Text>
                <Text style={styles.value}>{data?.me?.name}</Text>
            </View>
            <View style={[globalStyles.flex, styles.row]}>
                <Text style={globalStyles.heading}>USERNAME</Text>
                <Text style={styles.value}>{data?.me?.username}</Text>
            </View>
            <View style={[globalStyles.flex, styles.row]}>
                <Text style={globalStyles.heading}>EMAIL</Text>
                <Text style={styles.value}>{data?.me?.email}</Text>
            </View>
            <View style={[globalStyles.flex, styles.row]}>
                <Text style={globalStyles.heading}>BIO</Text>
                <Text style={styles.value}>{data?.me?.bio}</Text>
            </View>
            <View style={[globalStyles.flex, styles.row]}>
                <Text style={globalStyles.heading}>JOINED</Text>
                <Text style={styles.value}>
                    {new Date(
                        parseInt(data?.me?.createdAt || "")
                    ).toLocaleDateString()}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 13,
        backgroundColor: theme.backgroundColor,
    },
    value: {
        color: theme.grayDark,
        fontSize: 17,
        marginLeft: "auto",
        marginRight: 0,
        fontFamily: fonts.inter_500,
    },
    row: {
        marginVertical: 5,
    },
});
