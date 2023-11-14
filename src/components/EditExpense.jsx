import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import InputField from "./ui/InputField";
import { ExpensesContext } from "../context/Expenses";
import { FaEdit } from "react-icons/fa";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhlOWQwMTI3YmI1YWI0ZmMxZmEwZWQiLCJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTk3ODYzNDB9.sR3h7dEhEd5ONgr7C7_J4lwuzTHuB0ha74NOD1QgfBo";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const categories = ["Fuel", "Entertainment", "Beauty/Wellness", "Pets", "Shopping"];

export default function EditExpense({ expense }) {
  const expensesContext = useContext(ExpensesContext);
  const editExpenseHandler = expensesContext.editExpenseHandler;

  const toast = Chakra.useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const _id = expense._id;
  const [amount, setAmount] = useState(expense.amount);
  const [description, setDescription] = useState(expense.description);
  const [category, setCategory] = useState(expense.category);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const editExpense = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${SERVER_URL}/user/expense`,
        {
          id: _id,
          amount: amount,
          description: description,
          category: category,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response.status == 200) {
        editExpenseHandler(response.data);
        toast({
          position: "top-right",
          title: "Success",
          description: "Expense edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Close the Modal
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Chakra.Icon w={5} h={5} cursor={"pointer"} as={FaEdit} onClick={onOpen}>
        Edit
      </Chakra.Icon>

      <Chakra.Modal isOpen={isOpen} onClose={onClose}>
        <Chakra.ModalOverlay />
        <form onSubmit={editExpense}>
          <Chakra.ModalContent>
            <Chakra.ModalHeader>Edit Expense</Chakra.ModalHeader>
            <Chakra.ModalCloseButton />
            <Chakra.ModalBody>
              <InputField
                onChange={handleAmountChange}
                value={amount}
                type={"number"}
                label={"Amount"}
                helperText={"Enter the amount of the expense"}
              />
              <InputField
                onChange={handleDescriptionChange}
                value={description}
                type={"text"}
                label={"Description"}
                helperText={"Enter the description of the expense"}
              />
              <Chakra.FormLabel>Category </Chakra.FormLabel>
              <Chakra.Select placeholder="Select option" onChange={handleCategoryChange}>
                {categories.map((category) => (
                  <option key={category} value={category} selected={expense.category === category}>
                    {category}
                  </option>
                ))}
              </Chakra.Select>
            </Chakra.ModalBody>

            <Chakra.ModalFooter>
              <Chakra.Button type="submit" colorScheme="blue">
                Edit
              </Chakra.Button>
              <Chakra.Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Chakra.Button>
            </Chakra.ModalFooter>
          </Chakra.ModalContent>
        </form>
      </Chakra.Modal>
    </>
  );
}
