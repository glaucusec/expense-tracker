import React, { useRef, useContext, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import InputField from "./ui/InputField";
import axios from "axios";
import { ExpensesContext } from "../context/Expenses";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ExpenseForm({ setShowExpenseFormHandler }) {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expenses;
  const updateExpenseHandler = expensesContext.updateExpenseHandler;

  const toast = Chakra.useToast();
  const [loading, setLoading] = useState(false);

  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descRef.current.value;
    const selectedCategory = categoryRef.current.value;
    try {
      const response = await axios.post(
        PROD ? `${VITE_SERVER_URL}/api/expense` : `/api/expense`,
        {
          amount: enteredAmount,
          description: enteredDescription,
          category: selectedCategory,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status == 201) {
        toast({
          position: "top-right",
          title: "Success",
          description: "Expense created succesfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        updateExpenseHandler(response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
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

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <Chakra.Card padding={"1rem"}>
          <Chakra.Heading as={"h2"} size={"md"}>
            Add New Expense
          </Chakra.Heading>
          <InputField
            type={"number"}
            reference={amountRef}
            label={"Amount"}
            helperText={"Enter the amount of the expense"}
          />
          <InputField
            type={"text"}
            reference={descRef}
            label={"Description"}
            helperText={"Enter the description of the expense"}
          />
          <Chakra.FormLabel>Category </Chakra.FormLabel>
          <Chakra.Select placeholder="Select option" ref={categoryRef}>
            <option value="Fuel">Fuel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Beauty/Wellness">Beauty/Wellness</option>
            <option value="Pets">Pets</option>
            <option value="Shopping">Shopping</option>
          </Chakra.Select>
          <Chakra.Box pt={"1rem"}>
            <Chakra.ButtonGroup>
              <Chakra.Button
                isLoading={loading ? true : false}
                type="submit"
                colorScheme="blue"
                size={"sm"}
              >
                Add Expense
              </Chakra.Button>
              <Chakra.Button onClick={setShowExpenseFormHandler} size={"sm"}>
                Hide
              </Chakra.Button>
            </Chakra.ButtonGroup>
          </Chakra.Box>
        </Chakra.Card>
      </form>
    </React.Fragment>
  );
}
