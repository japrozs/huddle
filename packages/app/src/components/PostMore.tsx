import { useApolloClient } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { fonts, layout, theme } from "../theme";

interface PostMoreProps {
    post: any;
}

export const PostMore: React.FC<PostMoreProps> = ({ post, ...props }) => {
    const { data, loading } = useMeQuery();
    const [deletePost] = useDeletePostMutation();
    const [visible, setVisible] = useState(false);
    const client = useApolloClient();
    const toggle = () => {
        setVisible(!visible);
    };
    return (
        <>
            <Modal animationType="slide" transparent={true} visible={visible}>
                <View style={styles.centeredView}>
                    <Text
                        style={styles.option}
                        onPress={() => {
                            Alert.alert(
                                "Are you sure you want to report this post ?"
                            );
                            setVisible(false);
                        }}
                    >
                        Report
                    </Text>
                    {data?.me?.id == post?.creator?.id ? (
                        <Text
                            style={[styles.option, { color: theme.red }]}
                            onPress={async () => {
                                const res = await deletePost({
                                    variables: {
                                        postId: post?.id,
                                    },
                                });
                                console.log(res);
                                await client.resetStore();
                                setVisible(false);
                            }}
                        >
                            Delete
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Text
                        style={[styles.option, { color: theme.red }]}
                        onPress={() => setVisible(false)}
                    >
                        Cancel
                    </Text>
                </View>
            </Modal>

            <Feather
                onPress={() => setVisible(true)}
                style={{ marginLeft: "auto", marginRight: 0 }}
                name="more-vertical"
                size={layout.iconSize}
                color={theme.grayDark}
            />
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        backgroundColor: theme.backgroundColor,
        width: "100%",
        borderTopColor: theme.borderColor,
        borderTopWidth: 1,
    },
    option: {
        color: theme.grayDark,
        fontSize: 18,
        fontFamily: fonts.inter_500,
        padding: 10,
    },
});
