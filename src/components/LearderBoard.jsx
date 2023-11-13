import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import { GiPodiumWinner, GiPodiumSecond, GiPodiumThird } from "react-icons/gi";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhlOWQwMTI3YmI1YWI0ZmMxZmEwZWQiLCJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTk3ODYzNDB9.sR3h7dEhEd5ONgr7C7_J4lwuzTHuB0ha74NOD1QgfBo";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const prizes = [GiPodiumWinner, GiPodiumSecond, GiPodiumThird];

export default function LeaderBoard() {
  const toast = Chakra.useToast();
  const [leaderboard, setLeaderBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderBoard() {
      try {
        const response = await axios.post(`${SERVER_URL}/premium/leaderboard`, {
          headers: {
            Authorization: authToken,
          },
        });
        const receivedLeaderBoard = response.data;
        setIsLoading(false);
        setLeaderBoard(receivedLeaderBoard);
      } catch (error) {
        setIsLoading(false);
        toast({
          position: "top-right",
          title: "Error fetching Leaderboard",
          description: "Check your connection or Try later!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    fetchLeaderBoard();
  }, []);
  if (isLoading) {
    return (
      <Chakra.Box padding={"1rem"}>
        <Chakra.SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="6" />
      </Chakra.Box>
    );
  }
  if (!isLoading && leaderboard.length == 0) {
    return (
      <Chakra.Box padding={"1rem"}>
        <Chakra.Heading as={"h2"} size={"md"}>
          Empty LeaderBoard
        </Chakra.Heading>
      </Chakra.Box>
    );
  }
  return (
    <Chakra.Box>
      <Chakra.Card>
        <Chakra.CardHeader>
          <Chakra.Heading size="md">Leaderboard</Chakra.Heading>
        </Chakra.CardHeader>

        <Chakra.CardBody>
          <Chakra.Stack divider={<Chakra.StackDivider />} spacing="4">
            {leaderboard.map((item, index) => {
              console.log(index);
              return (
                <Chakra.Box>
                  <Chakra.Heading size="xs" textTransform="uppercase">
                    {item.name} <Chakra.Icon as={prizes[index]}></Chakra.Icon>
                  </Chakra.Heading>
                  <Chakra.Text pt="2" fontSize="sm">
                    {`Amount Spent: ${item.totalAmount} `}
                  </Chakra.Text>
                </Chakra.Box>
              );
            })}
          </Chakra.Stack>
        </Chakra.CardBody>
      </Chakra.Card>
    </Chakra.Box>
  );
}