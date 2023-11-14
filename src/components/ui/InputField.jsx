import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
} from "@chakra-ui/react";

export default function InputField({
  placeholder,
  reference,
  type,
  label,
  helperText,
  value,
  onChange,
}) {
  return (
    <Box pb={4}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          onChange={onChange}
          variant={"flushed"}
          value={value}
          placeholder={placeholder}
          ref={reference}
          type={type}
          required={true}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}
