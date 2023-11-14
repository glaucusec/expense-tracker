import React, { useContext } from "react";
import axios from "axios";
import { Icon, useToast } from "@chakra-ui/react";
import { ExpensesContext } from "../context/Expenses";

import { AiFillDelete } from "react-icons/ai";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhlOWQwMTI3YmI1YWI0ZmMxZmEwZWQiLCJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTk3ODYzNDB9.sR3h7dEhEd5ONgr7C7_J4lwuzTHuB0ha74NOD1QgfBo";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function DeleteExpense({ _id }) {
  const expensesContext = useContext(ExpensesContext);
  const deleteExpenseHandler = expensesContext.deleteExpenseHandler;

  const toast = useToast();

  const deleteExpense = async (_id) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/user/expense`, {
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

  return (
    <Icon cursor={"pointer"} w={5} h={5} as={AiFillDelete} onClick={() => deleteExpense(_id)}>
      Delete
    </Icon>
  );
}
