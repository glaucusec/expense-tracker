import React, { useContext, useState } from "react";
import axios from "axios";
import { Icon, useToast, Spinner } from "@chakra-ui/react";
import { ExpensesContext } from "../context/Expenses";

import { AiFillDelete } from "react-icons/ai";

export default function DeleteExpense({ _id }) {
  const [loading, setLoading] = useState(false);

  const expensesContext = useContext(ExpensesContext);
  const deleteExpenseHandler = expensesContext.deleteExpenseHandler;

  const toast = useToast();

  const deleteExpense = async (_id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/expense`,
        {
          data: { id: _id },
        },
        { withCredentials: true }
      );
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
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.error(e.message);
      toast({
        position: "top-right",
        title: error.response.data.message,
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return loading ? (
    <Spinner size="sm" />
  ) : (
    <Icon cursor={"pointer"} w={5} h={5} as={AiFillDelete} onClick={() => deleteExpense(_id)}>
      Delete
    </Icon>
  );
}
