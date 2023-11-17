import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon, Icon } from "@chakra-ui/icons";
import { MdWorkspacePremium } from "react-icons/md";
import axios from "axios";

import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import PremiumPurchase from "./PremiumPurchase";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Header({ currPage, setCurrPage }) {
  const authCtx = useContext(AuthContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(PROD ? `${VITE_SERVER_URL}/api/logout` : `/api/logout`, {
        withCredentials: true,
      });
      if (response.status == 200) {
        toast({
          status: "warning",
          title: "You are logged Out!",
        });
        authCtx.AuthStateUpdater(false, "", false);
      }
    } catch (error) {
      console.log(error.message);
      toast({
        status: "error",
        title: "Can't log you out! Try again later.",
      });
    }
  };

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
            <Text
              as={currPage == "dashboard" ? "b" : ""}
              cursor={"pointer"}
              onClick={() => setCurrPage("dashboard")}
            >
              Expense Tracker
            </Text>
          </HStack>
          <Flex alignItems={"center"}>
            {authCtx.auth.isPremiumUser ? (
              <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }} pr={"10px"}>
                <HStack spacing={8} alignItems={"center"}>
                  <Text
                    as={currPage == "leaderboard" ? "b" : ""}
                    cursor={"pointer"}
                    onClick={() => setCurrPage("leaderboard")}
                  >
                    Leaderboard
                  </Text>
                  <Text
                    as={currPage == "reports" ? "b" : ""}
                    cursor={"pointer"}
                    onClick={() => setCurrPage("reports")}
                  >
                    Reports
                  </Text>
                </HStack>
                <Icon as={MdWorkspacePremium} w={8} h={8} color="yellow.500" />
              </HStack>
            ) : (
              <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }} pr={"10px"}>
                <PremiumPurchase />
              </HStack>
            )}

            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Avatar size={"sm"} bg={"gray"} />
              </MenuButton>
              <MenuList>
                <MenuItem>{`Hola, ${authCtx.auth.name}`}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            {authCtx.auth.isPremiumUser ? (
              <Stack as={"nav"} spacing={4}>
                <Text
                  as={currPage == "leaderboard" ? "b" : ""}
                  cursor={"pointer"}
                  onClick={() => setCurrPage("leaderboard")}
                >
                  Leaderboard
                </Text>
                <Text
                  as={currPage == "reports" ? "b" : ""}
                  cursor={"pointer"}
                  onClick={() => setCurrPage("reports")}
                >
                  Reports
                </Text>
                <Icon as={MdWorkspacePremium} w={8} h={8} color="yellow.500" />
              </Stack>
            ) : (
              <Stack as={"nav"} spacing={4}>
                <Button colorScheme="yellow" size={"sm"}>
                  Buy Premium
                </Button>
              </Stack>
            )}
          </Box>
        ) : null}
      </Box>

      <Box p={4}></Box>
    </>
  );
}
