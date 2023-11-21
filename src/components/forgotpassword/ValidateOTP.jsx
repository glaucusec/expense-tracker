import "./ForgotPassword.css";
import React, { useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import InputField from "../ui/InputField";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ValidateOTP({ setCurrPage, setOtp }) {
  const otpRef = useRef("");
  const toast = useToast();

  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setIsOtpSubmitting(true);
    const enteredOTP = otpRef.current.value;
    try {
      const response = await axios.get(
        PROD
          ? `${VITE_SERVER_URL}/api/reset-password/${enteredOTP}`
          : `/api/reset-password/${enteredOTP}`,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200 && response.data.active) {
        setIsOtpSubmitting(false);
        toast({
           
          status: "success",
          title: "OTP validated",
          desc: "OTP entered is valid",
          duration: 9000,
          isClosable: true,
        });
      }
      setOtp(response.data.otp);
      setCurrPage("reset-password");
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        title: "OTP Invalid",
        desc: "OTP entered is Invalid!",
        duration: 9000,
        isClosable: true,
      });
      setIsOtpSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleOTPSubmit}>
      <Chakra.Center>
        <Chakra.Heading> Validate OTP </Chakra.Heading>
      </Chakra.Center>
      <Chakra.Box>
        <InputField
          label={"Enter the OTP received"}
          reference={otpRef}
          type={"number"}
          helperText="You'll receive a email with OTP!"
        />
      </Chakra.Box>
      {isOtpSubmitting ? (
        <Chakra.Button isLoading />
      ) : (
        <Chakra.Button type="submit" colorScheme="blue">
          Validate OTP
        </Chakra.Button>
      )}
    </form>
  );
}
