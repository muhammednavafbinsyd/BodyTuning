import React, { useState, useEffect } from "react";
import SoftInput from "components/SoftInput";
import { Button } from "@mui/material";
import "../assets/usercss/forgotpassword.css";
import axios from "axios";
function otpverification() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [otp, setotp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const email = localStorage.getItem("email");
  const [input, setinput] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
        alert("Your OTP has expired.");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);
  const Verifyotps = (e) => {
    e.preventDefault();
    if (!otp) {
      setinput("Enter OTP code");
    } else {
      setinput(null);
      axios
        .post(`${BaseUrl}/userroute/verifyotp`,{otp})
        .then((response) => {
          if (response.status === 200) {
            alert("Verified");
            window.location.href = "/passwordset";
          }
        })
        .catch((err) => {
          console.log(err);
          if (response.status === 400) {
            console.log(response.data.err);
          }
        });
    }
  };
  const Resend = () => {
    axios
      .post(`${BaseUrl}/userroute/sendotp`,{email})
      .then((response) => {
        if (response.status === 200) {
          alert("OTP Resent");
          setCountdown(30);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          console.log(error.response.data.err);
          alert("Failed to resend OTP");
        }
      });
  };
  return (
    <div>
      <div className="forgot-box">
        <h4 className="gradient-text"></h4>
        <p style={{ fontSize: "11px" }}>Otp expire within{countdown}</p>
        <div className="box1">
          <div>
          <p style={{ fontSize: "10px", cursor: "pointer" }} onClick={Resend}>
              {" "}
              Resend OTP ?
            </p>
            <SoftInput
              type="tel"
              placeholder="Enter otp "
              onChange={(e) => setotp(e.target.value)}
            ></SoftInput>
            <p style={{ fontSize: "10px", color: "red", marginLeft: "14px" }}>{input}</p>
            <Button style={{ marginTop: "1vh" }} onClick={Verifyotps}>
              verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default otpverification;
