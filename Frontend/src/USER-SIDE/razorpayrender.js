/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import crypto from "crypto-js";
import Axios from "axios";

// Function to load script and append in DOM tree.
const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });
const RenderRazorpay = ({ orderId, keyId, keySecret, currency, amount }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  const navigate = useNavigate()
  // To load razorpay checkout modal script.
  const displayRazorpay = async (options) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // All information is loaded in options which we will discuss later.
    const rzp1 = new window.Razorpay(options);
    // If you want to retreive the chosen payment method.
    rzp1.on("payment.submit", (response) => {
      paymentMethod.current = response.method;
    });
    // To get payment id in case of failed transaction.
    rzp1.on("payment.failed", (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });
    // to open razorpay checkout modal.
    rzp1.open();
  };
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const key_id = process.env.REACT_APP_RAZORPAY_KEY_ID
  const KeySecret = process.env.REACT_APP_RAZORPAY_KEY_SECRET
  const handlePayment = async ( status, orderDetails = {}) => {
    await Axios.post(`${BaseUrl}/adminroute/payment`,{
      status,
      orderDetails,
      key_id,
      KeySecret
    });
    const appliedPackage ="paid";
    localStorage.setItem("appliedPackage", JSON.stringify(appliedPackage));
  };
  const storedItems = JSON.parse(localStorage.getItem("userProfile")) || {};
  const name = storedItems.username;
  // we will be filling this object in next step.
  const options = {
    key: keyId, // key id from props
    amount: amount * 100, // Amount in lowest denomination from props
    currency:currency, // Currency from props.
    name: name, // Title for your organization to display in checkout modal
    // image, // custom logo  url
    order_id: orderId, // order id from props
    // This handler menthod is always executed in case of succeeded payment
    handler: (response) => {
      console.log("succeeded");
      console.log(response);
      paymentId.current = response.razorpay_payment_id;

      // Most important step to capture and authorize the payment. This can be done of Backend server.
      const succeeded =
        crypto.HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret).toString() ===
        response.razorpay_signature;

      // If successfully authorized. Then we can consider the payment as successful.
      if (succeeded) {
        handlePayment("succeeded", {
          orderId:orderId,
          paymentId:response.razorpay_payment_id,
          signature: response.razorpay_signature,        
        });
        navigate("/mysubscription")
      } else {
        handlePayment("failed", {
          orderId:orderId,
          paymentId: response.razorpay_payment_id,
        });
      }
    },
    modal: {
      confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
      // This function is executed when checkout modal is closed
      // There can be 3 reasons when this modal is closed.
      ondismiss: async (reason) => {
        const {
          reason: paymentReason,
          field,
          step,
          code,
        } = reason && reason.error ? reason.error : {};
        // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly.
        if (reason === undefined) {
          console.log("cancelled");
          handlePayment("Cancelled");
        }
        // Reason 2 - When modal is auto closed because of time out
        else if (reason === "timeout") {
          console.log("timedout");
          handlePayment("timedout");
        }
        // Reason 3 - When payment gets failed.
        else {
          console.log("failed");
          handlePayment("failed", {
            paymentReason,
            field,
            step,
            code,
          });
        }
      },
    },
    // This property allows to enble/disable retries.
    // This is enabled true by default.
    retry: {
      enabled: false,
    },
    timeout: 900, // Time limit in Seconds
    theme: {
      color: "", // Custom color for your checkout modal.
    },
  };

  useEffect(() => {
    console.log("in razorpay");
    const initRazorpay = async () => {
      await displayRazorpay(options);
    };
    initRazorpay();
  }, []);
  

  return null;
};

export default RenderRazorpay;
