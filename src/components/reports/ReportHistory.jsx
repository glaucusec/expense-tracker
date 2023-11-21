import React, { useState, useEffect } from "react";
import { Center, Box } from "@chakra-ui/react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  TableContainer,
  Stack,
  Link,
  Button,
  Card,
  SkeletonText,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ReportHistory() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState({ previous: false, current: 1, next: false });
  const [urls, setUrls] = useState([]);

  const nextChangeHandler = (next) => {
    setPage({ ...page, current: next });
  };
  const prevChangeHandler = (prev) => {
    setPage({ ...page, current: prev });
  };

  const reportFetchHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        PROD
          ? `${VITE_SERVER_URL}/api/fileurls?page=${page.current}&limit=${limit}`
          : `/api/fileurls?page=${page.current}&limit=${limit}`,
        { withCredentials: true }
      );
      const data = response.data;
      const prev = data.previous ? data.previous : false;
      const curr = data.current ? data.current : 1;
      const next = data.next ? data.next : false;
      setPage({ previous: prev, current: curr, next: next });
      setUrls(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Error!",
        description: "Something went wrong on our side! Try later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    reportFetchHandler();
  }, [page.current]);

  if (!isLoading && urls.length == 0) {
    return (
      <Center pt={"2rem"}>
        <Heading as={"h1"} size={"sm"}>
          You have no reports generated!
        </Heading>
      </Center>
    );
  }

  return (
    <Box pt={"3rem"}>
      <Center>
        <Box>
          {isLoading ? (
            ""
          ) : (
            <Center pb={"2rem"}>
              <Heading as={"h1"} size={"sm"}>
                Previously Generated Reports
              </Heading>
            </Center>
          )}

          <TableContainer pb={"1rem"}>
            {isLoading ? (
              <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="10" />
            ) : (
              <Table variant="simple">
                <Tbody>
                  {urls.map((url, index) => {
                    const urlparts = url.fileURL.split("/");
                    let date = decodeURIComponent(urlparts[urlparts.length - 1]);

                    return (
                      <Tr key={index}>
                        <Td>
                          <Link href={`${url.fileURL}`}>{date.split("(")[0]}</Link>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            )}
          </TableContainer>
          <Center>
            <Stack direction={"row"} spacing="24px">
              <Button
                onClick={() => prevChangeHandler(page.previous)}
                isDisabled={!page.previous}
                size={"sm"}
              >
                {"<<"}
              </Button>
              <Button onClick={() => prevChangeHandler(page.previous)} isDisabled={!page.previous}>
                {page.previous ? page.previous : ""}
              </Button>
              <Button>{page.current ? page.current : ""}</Button>
              <Button onClick={() => nextChangeHandler(page.next)} isDisabled={!page.next}>
                {page.next ? page.next : ""}
              </Button>
              <Button
                onClick={() => nextChangeHandler(page.next)}
                isDisabled={!page.next}
                size={"sm"}
              >
                {">>"}
              </Button>
            </Stack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
