import React, { useRef } from "react";
import * as Chakra from "@chakra-ui/react";
import InputField from "./ui/InputField";

export default function ExpenseForm({ setShowExpenseFormHandler }) {
  const amountRef = useRef(0);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <Chakra.Box padding={"1rem"} borderWidth={"1px"}>
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
            reference={amountRef}
            label={"Description"}
            helperText={"Enter the description of the expense"}
          />
          <Chakra.FormLabel>Category </Chakra.FormLabel>
          <Chakra.Select label={"hey"} placeholder="Select option">
            <option value="option1">Fuel</option>
            <option value="option2">Entertainment</option>
            <option value="option3">Beauty/Wellness</option>
            <option value="option2">Pets</option>
            <option value="option2">Shopping</option>
          </Chakra.Select>
          <Chakra.Box pt={"1rem"}>
            <Chakra.ButtonGroup>
              <Chakra.Button colorScheme="blue" size={"sm"}>
                Add Expense
              </Chakra.Button>
              <Chakra.Button onClick={setShowExpenseFormHandler} size={"sm"}>Hide</Chakra.Button>
            </Chakra.ButtonGroup>
          </Chakra.Box>
        </Chakra.Box>
      </form>
    </React.Fragment>
  );
}
