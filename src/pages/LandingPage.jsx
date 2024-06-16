import React from "react";
import { Box, Center, Text, Spacer, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Box w="100%">
        <Center>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Expense Tracker
            <Flex>
              <Box p="4">
                <Link to={"login"}>
                  <Text fontSize="2xl">Login</Text>
                </Link>
              </Box>
              <Spacer />
              <Box p="4">
                <Link to={"login"}>
                  <Text fontSize="2xl">Register</Text>
                </Link>
              </Box>
            </Flex>
          </Text>
        </Center>
      </Box>
    </>
  );
}
