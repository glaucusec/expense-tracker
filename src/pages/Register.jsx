import "./Register.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import ValidationMessage from "../components/ui/ValidationMessage";
import InputField from "../components/ui/InputField";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Register() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [validationMessage, setValidationMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const currName = nameRef.current.value;
    const currEmail = emailRef.current.value;
    const currPassword = passwordRef.current.value;
    try {
      const response = await axios.post(
        PROD ? `${VITE_SERVER_URL}/api/signup` : `/api/signup`,
        {
          name: currName,
          email: currEmail,
          password: currPassword,
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      const statusCode = response.status;
      if (statusCode == 200) {
        setValidationMessage({
          type: "success",
          title: "Account Created Successfully",
          desc: "Thank you for signing up! You can now log in.",
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 403:
          setValidationMessage({
            type: "error",
            title: "User Already Exists",
            desc: "You are an existing User, Please Login",
          });
          break;
        case 500:
          setValidationMessage({
            type: "error",
            title: "Server Error",
            desc: "Oops! Something went wrong on our end. Please try again later or contact support.",
          });
          break;
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Chakra.Box id="register">
      <form onSubmit={handleSubmit}>
        <Chakra.Box borderWidth={"1px"} borderRadius={"lg"} padding={"10px"}>
          {validationMessage && (
            <ValidationMessage
              type={validationMessage.type}
              title={validationMessage.title}
              description={validationMessage.desc}
            />
          )}
          <Chakra.Center>
            <Chakra.Heading> Sign Up </Chakra.Heading>
          </Chakra.Center>
          <InputField reference={nameRef} type="text" label="Your Name" />
          <InputField
            reference={emailRef}
            type="email"
            label="Email Address"
            helperText="We'll never share your email."
          />
          <InputField
            reference={passwordRef}
            type="password"
            label="Password"
            helperText={"Enter 6 characters or more!."}
          />
          {isSubmitting ? (
            <Chakra.Button isLoading />
          ) : (
            <Chakra.Button type="submit" colorScheme="blue">
              Sign Up
            </Chakra.Button>
          )}
          <Chakra.Box>
            If you are an existing user, <Link to={"/login"}>Login Here</Link>
          </Chakra.Box>
        </Chakra.Box>
      </form>
    </Chakra.Box>
  );
}
