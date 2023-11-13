import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Switch,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/icons";
import { MdWorkspacePremium } from "react-icons/md";

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to={"/dashboard"}>Expense Tracker</Link>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }} pr={"10px"}>
              <HStack spacing={8} alignItems={"center"}>
                <Link to={"/dashboard/premium"}>Leaderboard</Link>
                <Link to={"/dashboard/reports"}>Reports</Link>
              </HStack>
              <Icon as={MdWorkspacePremium} w={8} h={8} color="yellow.500" />
            </HStack>
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Avatar size={"sm"} bg={"gray"} />
              </MenuButton>
              <MenuList>
                <MenuItem>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link to={"/dashboard/premium"}>Leaderboard</Link>
              <Link to={"/dashboard/reports"}>Reports</Link>
              <Icon as={MdWorkspacePremium} w={8} h={8} color="yellow.500" />
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}></Box>
    </>
  );
}
