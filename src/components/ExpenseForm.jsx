import React, { useRef, useContext } from "react";
import * as Chakra from "@chakra-ui/react";
import InputField from "./ui/InputField";
import axios from "axios";
import { ExpensesContext } from "../context/Expenses";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhlOWQwMTI3YmI1YWI0ZmMxZmEwZWQiLCJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTk3ODYzNDB9.sR3h7dEhEd5ONgr7C7_J4lwuzTHuB0ha74NOD1QgfBo";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ExpenseForm({ setShowExpenseFormHandler }) {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expenses;
  const updateExpenseHandler = expensesContext.updateExpenseHandler;

  const toast = Chakra.useToast();

  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descRef.current.value;
    const selectedCategory = categoryRef.current.value;
    try {
      const response = await axios.post(
        `${SERVER_URL}/user/expense`,
        {
          amount: enteredAmount,
          description: enteredDescription,
          category: selectedCategory,
        },
        {
          headers: {
            Authorization: authToken,
          },
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
        updateExpenseHandler(response.data);
      }
    } catch (error) {
      console.log(error);
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
              <Chakra.Button type="submit" colorScheme="blue" size={"sm"}>
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
