import React, { useContext } from "react";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { AuthContext } from "../context/Auth";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function PremiumPurchase() {
  const authCtx = useContext(AuthContext);
  const [Razorpay] = useRazorpay();
  const toast = useToast();

  const premiumPurchaseHandler = async () => {
    try {
      const response = await axios.post(`${VITE_SERVER_URL}/api/premium`, null, {
        withCredentials: true,
      });

      let options = {
        key: response.data.key_id,
        amount: "50000",
        currency: "INR",
        name: "Expense Tracker",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.data.orderId,
        handler: async function (res) {
          try {
            const response = await axios.post(
              `${VITE_SERVER_URL}/api/updatetransactionstatus`,
              {
                success: true,
                order_id: res.razorpay_order_id,
                payment_id: res.razorpay_payment_id,
              },
              {
                withCredentials: true,
              }
            );
            if (response.status == 200) {
              toast({
                position: "top-right",
                title: "Congratulations!",
                description: "You are a premium user! Enjoy Benefits",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              //   Update the AuthContext to Premium User
              authCtx.AuthStateUpdater(authCtx.auth.isLoggedIn, authCtx.auth.name, true);
            }
          } catch (error) {
            toast({
              position: "top-right",
              title: "Error!",
              description: "Something went wrong on server side!",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        },
        prefill: {
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      let rzp1 = new Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", async function (response) {
        await axios.post(
          `${VITE_SERVER_URL}/api/updatetransactionstatus`,
          {
            success: false,
            order_id: response.error.metadata.order_id,
            payment_id: response.error.metadata.payment_id,
          },
          {
            withCredentials: true,
          }
        );
        toast({
          position: "top-right",
          title: "Payment Failed!",
          description: "You transation Failed. Try later!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    } catch (error) {
      toast({
        position: "top-right",
        title: "Error!",
        description: "Something went wrong on server side!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Button onClick={premiumPurchaseHandler} colorScheme="yellow" size={"sm"}>
      Buy Premium
    </Button>
  );
}
