import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import InputField from "./ui/InputField";
import { ExpensesContext } from "../context/Expenses";
import { FaEdit } from "react-icons/fa";

const categories = ["Fuel", "Entertainment", "Beauty/Wellness", "Pets", "Shopping"];

export default function EditExpense({ expense }) {
  const expensesContext = useContext(ExpensesContext);
  const editExpenseHandler = expensesContext.editExpenseHandler;

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/expense`,
        {
          id: _id,
          amount: amount,
          description: description,
          category: category,
        },
        {
          withCredentials: true,
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
        setLoading(false);
        onClose();
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
              <Chakra.Button isLoading={loading ? true : false} type="submit" colorScheme="blue">
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
