import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

import React from "react";

export default function ({ type, title, description }) {
  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
