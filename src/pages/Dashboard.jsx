import "./Dashboard.css";
import React, { useState } from "react";
import * as Chakra from "@chakra-ui/react";

import ExpenseForm from "../components/ExpenseForm";
import Header from "../components/Header";
import ShowExpenses from "../components/ShowExpenses";

export default function Dashboard() {
  const [showExpenseForm, setShowExpenseForm] = useState(true);

  const setShowExpenseFormHandler = () => {
    setShowExpenseForm(!showExpenseForm);
  };
  return (
    <Chakra.Box id="dashboard">
      <Header />
      {showExpenseForm ? (
        <ExpenseForm setShowExpenseFormHandler={setShowExpenseFormHandler} />
      ) : (
        <Chakra.Center>
          <Chakra.Button onClick={setShowExpenseFormHandler} size={"sm"} colorScheme="blue">
            Show Add Expense Form
          </Chakra.Button>
        </Chakra.Center>
      )}
      <ShowExpenses />
    </Chakra.Box>
  );
}
