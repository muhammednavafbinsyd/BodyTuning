import React, { useState } from "react";
import SoftInput from "components/SoftInput";
import { Button } from "@mui/material";
import CoverLayout from "../components/CoverLayout";
import axios from "axios";
import SoftBox from "components/SoftBox";
const forgetpassword = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [email, setEmail] = useState(""); 
  const handleNextClick = async (e) => {
   e.preventDefault();
    try {
     axios.post(`${BaseUrl}/adminroute/sendotp`,{email})
     .then((response) =>{
      localStorage.setItem("email",response.data.email);
      window.location.href ="/verifyotp"
     })
    } catch (error) {
      console.error("Error sending OTP:", error);
      window.location.href ="/"
    }
  };
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
  return (
    <CoverLayout 
    title='Forgot password?'
     >
      <SoftBox style={containerStyles}>
        <h4 style={{ marginBottom: "1rem" }}>Find your account</h4>
        <SoftBox
          style={{
            display: "flex",
            flexDirection: "column", 
            alignItems: "center", 
          }}
        >
          <SoftInput
           name="email" 
           placeholder="Enter your email"
            style={inputStyles}
             onChange={(e) =>setEmail(e.target.value)}
            >
          </SoftInput>
          <Button mb={2} onClick={handleNextClick}>Next</Button>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
};
export default forgetpassword;
