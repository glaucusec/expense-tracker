import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhlOWQwMTI3YmI1YWI0ZmMxZmEwZWQiLCJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTk3ODYzNDB9.sR3h7dEhEd5ONgr7C7_J4lwuzTHuB0ha74NOD1QgfBo";

export default function ShowExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get("http://localhost:3000/user/expenses", {
          headers: {
            Authorization: authToken,
          },
        });
        const receivedExpenses = response.data;
        setIsLoading(false);
        setExpenses(receivedExpenses);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExpenses();
  }, []);
  if (isLoading) {
    return (
      <Chakra.Box padding={"1rem"}>
        <Chakra.SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="6" />
      </Chakra.Box>
    );
  }
  if (!isLoading && expenses.length == 0) {
    return (
      <Chakra.Box padding={"1rem"}>
        <Chakra.Heading as={"h2"} size={"md"}>
          Empty Expenses
        </Chakra.Heading>
      </Chakra.Box>
    );
  }
  return (
    <Chakra.Box padding={"1rem"}>
      <Chakra.Heading as={"h2"} size={"md"}>
        Added Expenses
      </Chakra.Heading>
      <Chakra.TableContainer>
        <Chakra.Table >
          <Chakra.Thead>
            <Chakra.Tr>
              <Chakra.Td>Amount</Chakra.Td>
              <Chakra.Td>Description</Chakra.Td>
              <Chakra.Td>Category</Chakra.Td>
              <Chakra.Td>Delete</Chakra.Td>
              <Chakra.Td>Edit</Chakra.Td>
            </Chakra.Tr>
          </Chakra.Thead>
          <Chakra.Tbody>
            {expenses.map((expense) => (
              <Chakra.Tr key={expense._id}>
                <Chakra.Td>{expense.amount}</Chakra.Td>
                <Chakra.Td>{expense.description}</Chakra.Td>
                <Chakra.Td>{expense.category}</Chakra.Td>
                <Chakra.Td>
                  <Chakra.Button size={"sm"}>Delete</Chakra.Button>
                </Chakra.Td>
                <Chakra.Td>
                  <Chakra.Button size={"sm"}>Edit</Chakra.Button>
                </Chakra.Td>
              </Chakra.Tr>
            ))}
          </Chakra.Tbody>
        </Chakra.Table>
      </Chakra.TableContainer>
    </Chakra.Box>
  );
}
