import React, { useState } from "react";
import SoftInput from "components/SoftInput";
import { Button } from "@mui/material";
import axios from "axios";
function Passwordset() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [newPassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const email = localStorage.getItem("email");
  const handleSave = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setinput1("Enter a new password");
    } else if (newPassword.length < 6) {
      setinput1("Password must be at least 6 characters");
    } else {
      setinput1(null);
    }
    if (!confirmpassword) {
      setinput2("Enter confirm password");
    } else if (confirmpassword.length < 6) {
      setinput2("Password must be at least 6 characters");
    } else {
      setinput2(null);
      const data = {
        newPassword: newPassword,
        confirmPassword: confirmpassword,
        email: email,
      };
      axios
        .post(`${BaseUrl}/userroute/newpassword`,data)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.success, "success ");
            localStorage.removeItem("email");
            window.location.href = "/login";
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            console.log(err.response.data.message);
            alert("err");
          }
        });
    }
  };
  return (
    <div>
      <div className="forgot-box">
        <h4 className="gradient-text">Set new password </h4>
        <div className="box1">
          <div>
            <SoftInput
              style={{ margin: "1.7vh" }}
              name="new password"
              type="tel"
              placeholder="Enter new password"
              onChange={(e) => setnewpassword(e.target.value)}
            ></SoftInput>
            <p style={{ fontSize: "10px", color: "red", marginLeft: "2rem" }}>{input1}</p>
            <SoftInput
              style={{ margin: "1.7vh" }}
              name="cofirm password"
              type="tel"
              placeholder="Enter confirm password"
              onChange={(e) => setconfirmpassword(e.target.value)}
            ></SoftInput>
            <p style={{ fontSize: "10px", color: "red", marginLeft: "2rem" }}>{input2}</p>
            <Button style={{ marginTop: "1.7vh" }} onClick={handleSave}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Passwordset;
