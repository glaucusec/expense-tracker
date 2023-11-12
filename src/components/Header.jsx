import React from "react";
import * as Chakra from "@chakra-ui/react";

export default function Header() {
  return (
    <Chakra.Box paddingBottom={"2rem"}>
      <Chakra.Flex minWidth="max-content" alignItems="center" gap="2">
        <Chakra.Box>
          <Chakra.Heading size="md">Expense Tracker</Chakra.Heading>
        </Chakra.Box>

        <Chakra.Spacer />

        <Chakra.Button colorScheme="red" size={"sm"}>
          Log Out
        </Chakra.Button>
      </Chakra.Flex>
    </Chakra.Box>
  );
}
