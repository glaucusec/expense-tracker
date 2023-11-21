import "./ForgotPassword.css";
import React, { useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import InputField from "../ui/InputField";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ResetPassword({ otp }) {
  const toast = useToast("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const password1Ref = useRef("");
  const password2Ref = useRef("");

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        PROD ? `${VITE_SERVER_URL}/api/reset-password/` : `/api/reset-password/`,
        { otp: otp, password1: password1Ref.current.value, password2: password2Ref.current.value },
        {
          withCredentials: true,
        }
      );
      if (response.status == 201) {
        setIsSubmitting(false);
        toast({
          status: "success",
          title: "Password Reset Successful!",
          description: "You can now login with new password.",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      switch (error.response.status) {
        case 404:
          toast({
            status: "error",
            title: "Passwords does not match!",
            description: "Please enter same passwords...",
            duration: 9000,
            isClosable: true,
          });
          break;
        case 400:
          toast({
            status: "error",
            title: "Incorrect OTP!",
            description: "Please enter otp received through mail",
            duration: 9000,
            isClosable: true,
          });
          break;
        case 500:
          toast({
            status: "error",
            title: "Internal Server Error!",
            description: "Something went wrong on our side! Try later",
            duration: 9000,
            isClosable: true,
          });
      }
    }
  };
  return (
    <form onSubmit={handleResetPasswordSubmit}>
      <Chakra.Center>
        <Chakra.Heading> Reset Password </Chakra.Heading>
      </Chakra.Center>
      <Chakra.Box>
        <InputField
          label={"Enter the password"}
          reference={password1Ref}
          type={"password"}
          helperText="Enter a secure password. You'll receive an email with OTP!"
        />
        <InputField
          label={"Confirm the password"}
          reference={password2Ref}
          type={"password"}
          helperText="Confirm your password. You'll receive an email with OTP!"
        />
      </Chakra.Box>
      {isSubmitting ? (
        <Chakra.Button isLoading />
      ) : (
        <Chakra.Button type="submit" colorScheme="blue">
          Reset Password
        </Chakra.Button>
      )}
      <Chakra.Box>
        <Link to={"/login"}>Click here to Login </Link>
      </Chakra.Box>
    </form>
  );
}
