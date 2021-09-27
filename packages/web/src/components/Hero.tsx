import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
    return (
        <Flex p={10}>
            <Box>
                <Text
                    fontWeight={"bold"}
                    fontSize={"4xl"}
                    maxW={["100vw", "100vw", "40vw"]}
                >
                    Create and join communities around favorite events
                </Text>
                <Text></Text>
            </Box>
        </Flex>
    );
};
