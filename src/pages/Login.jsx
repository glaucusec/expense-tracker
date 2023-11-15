import "./Login.css";
import React, { useRef, useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import InputField from "../components/ui/InputField";
import ValidationMessage from "../components/ui/ValidationMessage";

// Context
import { AuthContext } from "../context/Auth";

export default function Login() {
  const toast = useToast();
  const authContext = useContext(AuthContext);
  const AuthStateUpdater = authContext.AuthStateUpdater;

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const currEmail = emailRef.current.value;
    const currPassword = passwordRef.current.value;

    try {
      const response = await axios.post(
        `/api/login`,
        {
          email: currEmail,
          password: currPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const statusCode = response.status;
      switch (statusCode) {
        case 200:
          setValidationMessage({
            type: "success",
            title: "Login Successful. ",
            desc: "Redirecting to Dashboard...",
          });
          break;
      }
      if (response.data.success) {
        AuthStateUpdater(response.data.success, response.data.name);
        toast({
          status: "success",
          title: "You are logged in!",
        });
      }

      setIsSubmitting(false);
    } catch (error) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 403:
          setValidationMessage({
            type: "error",
            title: "Invalid Credentials",
            desc: "Double check your credentials and try again.",
          });
          break;
        case 404:
          setValidationMessage({
            type: "error",
            title: "User Not Found",
            desc: "The user associated with these credentials was not found. Please sign up if you haven't already.",
          });
          break;
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Chakra.Box id="login">
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
            <Chakra.Heading> Login </Chakra.Heading>
          </Chakra.Center>

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
              Login
            </Chakra.Button>
          )}
          <Chakra.Box>
            If you haven't registered, <Link to={"/register"}>SignUp Here </Link>
          </Chakra.Box>
        </Chakra.Box>
      </form>
    </Chakra.Box>
  );
}
