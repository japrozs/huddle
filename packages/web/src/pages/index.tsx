import Image from "next/image";
import { Flex, Box, Text } from "@chakra-ui/react";
import ScreenShot from "../public/images/screenshot.png";
import Logo from "../public/images/logo.png";
import Leaves from "../public/images/leaves.png";
import AndroidInstall from "../public/images/android_install.png";
import IosInstall from "../public/images/ios_install.png";

export default function Home() {
    return (
        <Box backgroundColor={"#FAFAFA"}>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    zIndex: 100,
                }}
            >
                <Image src={Leaves} alt="Leaves" width={346} height={133} />
            </div>
            <Flex p={10} pt={0} alignItems={"center"} justifyContent={"center"}>
                <Box visibility={["hidden", "hidden", "visible"]}>
                    <Image
                        src={ScreenShot}
                        alt="Screenshots"
                        width={454}
                        height={618}
                    />
                </Box>
                <Box
                    borderLeft={"1px solid #B2BDCD"}
                    pl={[0, 0, 9]}
                    maxW={["90vw", "90vw", "45vw"]}
                >
                    <Box ml={-2}>
                        <Image src={Logo} alt="Logo" width={194} height={60} />
                    </Box>
                    <Text
                        fontSize={"4xl"}
                        fontWeight={"semibold"}
                        lineHeight={9}
                    >
                        Create and join{" "}
                        <span style={{ color: "#15CDA8" }}>communities</span>{" "}
                        around your most{" "}
                        <span style={{ color: "#15CDA8" }}>loved events</span>
                    </Text>
                    <Text
                        my={5}
                        fontSize={[10, 10, 17]}
                        color={"#404F64"}
                        fontWeight={"medium"}
                    >
                        Huddle is an app that allows you to find other people
                        who share similar interests through the events and
                        conventions that you love and cherish.
                        <br />
                        <br /> Huddle allows you to create events where the
                        organisers and the visitors can share anecdotes and ask
                        questions. Also, your huddle page can be used as a way
                        to inform people about your event. <br />
                        <br />
                        Happy organising !
                    </Text>
                    <Flex alignItems={"center"}>
                        <Box mr={5}>
                            <Image
                                src={AndroidInstall}
                                alt="Android Install"
                                width={151}
                                height={58}
                            />
                        </Box>
                        <Box>
                            <Image
                                src={IosInstall}
                                alt="IOS Install"
                                width={128}
                                height={49}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            <Text
                alignSelf={"center"}
                justifySelf={"center"}
                textAlign={"center"}
                color={"#404F64"}
                fontWeight={"medium"}
                mb={5}
            >
                &copy; Huddle Inc. {new Date().getFullYear()}
            </Text>
        </Box>
    );
}
