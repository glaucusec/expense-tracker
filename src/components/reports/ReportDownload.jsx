import React, { useState } from "react";
import axios from "axios";
import { Button, Center, useToast } from "@chakra-ui/react";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ReportDownload() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const reportDownloadHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        PROD ? `${VITE_SERVER_URL}/api/download-report` : `/api/download-report`,
        { withCredentials: true }
      );
      if (response.data.success) {
        const downloadLink = document.createElement("a");
        downloadLink.href = response.data.fileURL;
        downloadLink.download = `${response.data.fileURL}`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      toast({
        position: "top-right",
        title: "Success",
        description: "Report Downloaded!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      toast({
        position: "top-right",
        title: "Failed",
        description: "Report download Failed. Try Later!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Center>
        <Button
          isLoading={loading}
          onClick={reportDownloadHandler}
          colorScheme="blue"
          size="md"
          width={["200px", "300px"]}
        >
          Download Report
        </Button>
      </Center>
    </>
  );
}
