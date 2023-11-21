import "./ForgotPassword.css";
import React, { useRef, useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import InputField from "../ui/InputField";

import ValidateOTP from "./ValidateOTP";
import ResetPassword from "./ResetPassword";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ForgotPassword() {
  const toast = useToast();

  const emailRef = useRef("");
  const [otp, setOtp] = useState(null);
  const [currPage, setCurrPage] = useState("forgot-password");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetLinkSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const currEmail = emailRef.current.value;

    try {
      const response = await axios.post(
        PROD ? `${VITE_SERVER_URL}/api/forgot-password` : `/api/forgot-password`,
        {
          email: currEmail,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const statusCode = response.status;
      switch (statusCode) {
        case 200:
          toast({
            status: "success",
            title: "Reset OTP sent!",
            desc: "You will receive a email with OTP",
            duration: 9000,
            isClosable: true,
          });
          break;
      }
      setIsSubmitting(false);
      setCurrPage("validate-otp");
    } catch (error) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 500:
          toast({
            status: "error",
            title: "Internal Server Error!",
            desc: "Something went wrong on our side! Try later.",
            duration: 9000,
            isClosable: true,
          });
          break;
        case 404:
          toast({
            type: "error",
            title: "Email Not Found",
            desc: "A user with this email does not exist!",
            duration: 9000,
            isClosable: true,
          });
          break;
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Chakra.Box id="forgot-password" borderWidth={"1px"} borderRadius={"lg"} padding={"10px"}>
      {(() => {
        switch (currPage) {
          case "forgot-password":
            return (
              <form onSubmit={handleResetLinkSubmit}>
                <Chakra.Center>
                  <Chakra.Heading> Forgot Password </Chakra.Heading>
                </Chakra.Center>
                <Chakra.Box>
                  <InputField
                    reference={emailRef}
                    type="email"
                    label="Email Address"
                    helperText="You'll receive a email if you are registered with us!"
                  />

                  {isSubmitting ? (
                    <Chakra.Button isLoading />
                  ) : (
                    <Chakra.Button type="submit" colorScheme="blue">
                      Send reset link
                    </Chakra.Button>
                  )}
                </Chakra.Box>
              </form>
            );
          case "validate-otp":
            return <ValidateOTP setCurrPage={setCurrPage} setOtp={setOtp} />;
          case "reset-password":
            return <ResetPassword setCurrPage={setCurrPage} otp={otp} />;
          default:
            return null;
        }
      })()}
    </Chakra.Box>
  );
}
