import "./Dashboard.css";
import React, { useState } from "react";
import * as Chakra from "@chakra-ui/react";

import ExpenseForm from "./ExpenseForm";
import Header from "./Header";
import ShowExpenses from "./ShowExpenses";
import LeaderBoard from "./LearderBoard";

export default function Dashboard() {
  const [showExpenseForm, setShowExpenseForm] = useState(true);
  const setShowExpenseFormHandler = () => {
    setShowExpenseForm(!showExpenseForm);
  };
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
