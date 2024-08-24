import React, { useEffect, useState } from "react";
import CoverLayout from "../components/CoverLayout";
import SoftInput from "components/SoftInput";
import { Button } from "@mui/material";
import axios from "axios";
import SoftBox from "components/SoftBox";
const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 5px 9px rgba(2, 0, 0, 0.7)",
    padding: "50px",
    borderRadius: "5px",
    width: "100%",
   
  };
  const inputStyles = {
    width: "100%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "16px",
  };
function Otpgenerator() { 
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [otp, setotp] = useState("");
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown -1 );
      } else {
        clearInterval(interval);
        alert("Your OTP has expired.");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);
const Verifyotps = (e)=>{
    e.preventDefault();
   axios.post(`${BaseUrl}/adminroute/verifyotp`,{otp})
   .then((response)=>{
    if(response.status === 200){
    alert("Verified")
    window.location.href = "/setpassword"
    }
   })
   .catch((err ) => {
    console.log(err);
    if(response.status === 400){
      console.log(response.data.err);
    }
  });
}
  return (
    <CoverLayout title=" Verify Your Otp">
      <SoftBox style={containerStyles}>
      <p style={{fontSize:"11px"}}>Otp expire within{countdown}</p>
        <SoftBox
         style={{
            display: "flex",
            flexDirection: "column", 
            alignItems: "center", 
          }}
         >
        <SoftInput 
        name="verify Otp" 
        placeholder="Verify Code"
        style={inputStyles}
        onChange={(e)=>setotp(e.target.value)}
        ></SoftInput>
        <Button mb={2} onClick={Verifyotps}>Verify</Button>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
};
export default Otpgenerator;
