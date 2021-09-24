import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fonts, globalStyles, theme } from "../../../../theme";
import { HuddleFooter } from "./settings";

interface PrivacyPolicyProps {}

interface HeaderProps {
    point: number;
    title: string;
}

const Header: React.FC<HeaderProps> = ({ point, title }) => {
    return (
        <View style={[globalStyles.flex, styles.pointContainer]}>
            <View style={styles.numberCount}>
                <Text style={styles.number}>{point}</Text>
            </View>
            <Text style={styles.numberText}>{title}</Text>
        </View>
    );
};

const Data = () => {
    return (
        <>
            <Header
                point={1}
                title={"Information you provide to us directly"}
            />
            <Text style={styles.text}>
                We may collect personal information, such as your name, email
                address, and payment information, when you register for our
                Service, sign up for our mailing list, or otherwise communicate
                with us. We may also collect any communications between you and
                Render and any other information you provide to Render.
            </Text>
            <Header
                point={2}
                title={"Data collected through the use of the Service"}
            />
            <Text style={styles.text}>
                We collect information about how you use the Service, your
                actions on the Service, and content you post to the Service
                (”User Content”), namely to improve the Service generally, to
                monitor and resolve issues, and for other internal purposes.
                Please remember that Render may, but has no obligation to,
                monitor, record, and store User Content in order to protect your
                safety or the safety of other users, to assist with regulatory
                or law enforcement efforts, or to protect and defend our rights
                and property.
            </Text>
            <Header
                point={3}
                title={
                    "Information we receive from third-party sites you connect to our Service"
                }
            />
            <Text style={styles.text}>
                We may receive personal information about you from third parties
                and combine that with information we collect through our
                Service. For example, we may obtain information when you log in
                through a third-party provider, such as Github or Slack. These
                services will authenticate your identity and may provide you the
                option to share certain personal information with us, which
                could include your name, email address, or other information.
                Similarly, when you interact with us through a social media site
                or third-party service, such as when you like, follow, share, or
                otherwise engage with Render content on Facebook, Twitter,
                Github, Slack, LinkedIn, or other sites, we may receive
                information from the social network, including your profile
                information, picture, user ID associated with your social media
                account, and any other information you permit the social network
                to share with third parties. The data we receive from these
                third-party sites is dependent upon that third party’s policies
                and your privacy settings on that third-party site. You should
                always review and, if necessary, adjust your privacy settings on
                third-party websites and services before linking or connecting
                them to our Service.
            </Text>
            <Text style={styles.text}>
                We use this information to operate, maintain, and provide to you
                the features and functionality of the Service, as well as to
                communicate directly with you, such as to send you email
                messages, including promotional messages, and permit you to
                communicate with others on the Service or on social media, or
                invite others to join the Service. We may also send you
                Service-related emails or messages (e.g., account verification,
                updates to features of the Service, technical and security
                notices). We may also use this information for any other lawful,
                legitimate business purpose.
            </Text>
            <Text style={styles.heading}>2. Sharing of Your Information</Text>
            <Text style={styles.text}>
                We may share your personal information in the instances
                described below. For further information on your choices
                regarding your information, see the ”Control Over Your
                Information” section below. We may share your personal
                information with:
            </Text>
            <Header
                point={1}
                title={"The public and other members of the Service"}
            />
            <Text style={styles.text}>
                Content you post to public areas of the Service will be viewable
                by others on the Service and the public. Please do not provide
                personal information you would not want to be public;
            </Text>
            <Text style={styles.heading}>3. Children's Privacy</Text>
            <Text style={styles.text}>
                Huddle does not knowingly collect or solicit any information
                from anyone under the age of 13 on this Service and the Services
                is not targeted towards anyone under the age of 13. If you
                believe that we might have received information from a child
                under 13, please contact us at privacy@huddle.com.
            </Text>
            <Text style={styles.heading}>4. How to Contact Us</Text>
            <Text style={styles.text}>
                If you have any questions about this Privacy Policy or the
                Service, please contact us at privacy@huddle.com.
            </Text>
            <Text style={styles.heading}>5. Changes to Our Privacy Policy</Text>
            <Text style={styles.text}>
                We may modify or update this Privacy Policy from time to time to
                reflect the changes in our business and practices, so you should
                review this page periodically. When we change the policy in a
                material manner, we will notify you by sending a notice to the
                primary email address specified in your Render account, by
                placing a prominent notice on our website or another appropriate
                method. We will also update the ‘last modified’ date at the top
                of this page. If you object to any changes, you may close your
                account.
            </Text>
        </>
    );
};

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({}) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>
                1. What Information Do We Collect and For What Purpose?
            </Text>
            <Text style={styles.text}>
                The categories of information we collect can include:
            </Text>
            <Data />
            <View style={{ marginTop: 70 }}></View>
            <HuddleFooter />
            <View style={{ marginTop: 10 }}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingRight: 12,
        backgroundColor: theme.backgroundColor,
        height: "100%",
    },
    heading: {
        fontSize: 21,
        fontFamily: fonts.inter_700,
        color: theme.blue,
        marginVertical: 8,
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.inter_500,
        color: theme.headingColor,
        textAlign: "justify",
    },
    numberCount: {
        backgroundColor: theme.borderColor,
        width: 23,
        height: 23,
        justifyContent: "center",
        borderRadius: 50,
    },
    number: {
        alignSelf: "center",
        fontSize: 13,
        fontFamily: fonts.inter_600,
        color: theme.blue,
    },
    numberText: {
        marginLeft: 10,
        fontSize: 17,
        fontFamily: fonts.inter_600,
        color: theme.textColor,
    },
    pointContainer: {
        marginTop: 10,
        marginBottom: 5,
    },
});
