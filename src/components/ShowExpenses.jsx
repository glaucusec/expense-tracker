import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import { ExpensesContext } from "../context/Expenses";
import DeleteExpense from "./DeleteExpense";
import EditExpense from "./EditExpense";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ShowExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expenses;
  const setExpenseHandler = expensesContext.setExpenseHandler;

  const toast = Chakra.useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get(`${VITE_SERVER_URL}/api/expenses`, {
          withCredentials: true,
        });
        const receivedExpenses = response.data;
        setIsLoading(false);
        setExpenseHandler(receivedExpenses);
      } catch (error) {
        console.log(error);
        setIsLoading(false);

        toast({
          position: "top-right",
          title: error.response.data.message,
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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
      <Chakra.Card padding={"1rem"} mt={"1rem"}>
        <Chakra.Heading as={"h2"} size={"md"}>
          Empty Expenses
        </Chakra.Heading>
      </Chakra.Card>
    );
  }
  return (
    <Chakra.Card padding={"1rem"} mt={"1rem"}>
      <Chakra.Heading as={"h2"} size={"md"}>
        Added Expenses
      </Chakra.Heading>
      <Chakra.TableContainer>
        <Chakra.Table>
          <Chakra.Thead>
            <Chakra.Tr>
              <Chakra.Td>Amount</Chakra.Td>
              <Chakra.Td>Description</Chakra.Td>
              <Chakra.Td>Category</Chakra.Td>
              <Chakra.Td>Delete </Chakra.Td>
              <Chakra.Td>Edit </Chakra.Td>
            </Chakra.Tr>
          </Chakra.Thead>
          <Chakra.Tbody>
            {expenses.map((expense) => (
              <Chakra.Tr key={expense._id}>
                <Chakra.Td>{expense.amount}</Chakra.Td>
                <Chakra.Td>{expense.description}</Chakra.Td>
                <Chakra.Td>{expense.category}</Chakra.Td>
                <Chakra.Td>
                  <Chakra.Text>
                    <DeleteExpense _id={expense._id} />
                  </Chakra.Text>
                </Chakra.Td>
                <Chakra.Td>
                  <Chakra.Text>
                    <EditExpense expense={expense} />
                  </Chakra.Text>
                </Chakra.Td>
              </Chakra.Tr>
            ))}
          </Chakra.Tbody>
        </Chakra.Table>
      </Chakra.TableContainer>
    </Chakra.Card>
  );
}
