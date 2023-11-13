import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import { ExpensesContext } from "../context/Expenses";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhlOWQwMTI3YmI1YWI0ZmMxZmEwZWQiLCJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTk3ODYzNDB9.sR3h7dEhEd5ONgr7C7_J4lwuzTHuB0ha74NOD1QgfBo";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ShowExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expenses;
  const setExpenseHandler = expensesContext.setExpenseHandler;
  const deleteExpenseHandler = expensesContext.deleteExpenseHandler;

  const toast = Chakra.useToast();
  // const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteExpense = async (_id) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/user/delete`, {
        data: { id: _id },
        headers: {
          Authorization: authToken,
        },
      });
      if (response.status == 200) {
        toast({
          position: "top-right",
          title: "Success",
          description: "Expense deleted successfully",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        deleteExpenseHandler(_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        setExpenseHandler(receivedExpenses);
      } catch (error) {
        setIsLoading(false);
        toast({
          position: "top-right",
          title: "Error fetching Expenses",
          description: "Check your connection or Try later!",
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
      <Chakra.Card padding={"1rem"}>
        <Chakra.Heading as={"h2"} size={"md"}>
          Empty Expenses
        </Chakra.Heading>
      </Chakra.Card>
    );
  }
  return (
    <Chakra.Card padding={"1rem"} mt={'1rem'}>
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
              <Chakra.Td>Delete Expense</Chakra.Td>
              <Chakra.Td>Edit Expense</Chakra.Td>
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
                    <Chakra.Link onClick={() => deleteExpense(expense._id)} color="red">
                      Delete
                    </Chakra.Link>
                  </Chakra.Text>
                </Chakra.Td>
                <Chakra.Td>
                  <Chakra.Text>
                    <Chakra.Link color="gray">Edit</Chakra.Link>
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
