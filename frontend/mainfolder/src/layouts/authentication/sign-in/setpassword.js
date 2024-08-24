import React, { useState } from "react";
import CoverLayout from "../components/CoverLayout";
import container from "assets/theme/components/container";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import { Button } from "@mui/material";
import axios from "axios";
function Setpassword() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [newPassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [err1, Seterr1] = useState("");
  const [err2, Seterr2] = useState("");
  const email = localStorage.getItem("email");
  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      newPassword: newPassword,
      confirmPassword: confirmpassword,
      email: email,
    };
    axios
      .post(`${BaseUrl}/adminroute/newpassword`, data)
      .then((response) => {
        if (response.status === 200) {
    
          alert(response.data.success, "success ");
          localStorage.removeItem("email");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          console.log(err.response.data.message);
        }
      });      
  if (!newPassword.trim()) {
    Seterr1("Enter your new password");
  } else if (!newPassword.length < 6) {
    Seterr1(" Password must be at least 6 characters");
  } else {
    Seterr1("");
  }
  if (!confirmpassword.trim()) {
    Seterr2("Enter your confirmation password");
  } else if (!confirmpassword.length < 6) {
    Seterr2("Please enter at least 6 characters");
  }else{
    Seterr2("");
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
    <CoverLayout title="Set Your New Password">
      <div style={containerStyles}>
        <SoftBox mb={2}>
          <SoftInput
            style={inputStyles}
            name="password"
            placeholder="New password"
            onChange={(e) => setnewpassword(e.target.value)}
          />
          <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err1}</p>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            style={inputStyles}
            name="password"
            placeholder="Confirm Password"
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err2}</p>
        </SoftBox>
        <Button mb={2} onClick={handleSave}>
          Next
        </Button>
      </div>
    </CoverLayout>
  );
}
export default Setpassword;
