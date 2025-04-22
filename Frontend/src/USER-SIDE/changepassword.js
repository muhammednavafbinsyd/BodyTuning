import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../assets/usercss/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bgimage from "../assets/img/banner-bg.jpg"

function Changepassword(){
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const storedUserProfile = JSON.parse(localStorage.getItem("userProfile"));
  const [Profile, setProfile] = useState(storedUserProfile);
  const navigate = useNavigate();

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [input3, setinput3] = useState("");

  const handlesave = async () => {

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    if (!oldPassword) {
      setinput1("Enter your old password");
    } else {
      setinput1(null)
    } 
  
    if (!newPassword) {
      setinput2("Enter your new password");
    } else if (newPassword.length < 6) {
      setinput2("password  must be at least 6 characters");
    } else {
      setinput2(null);
    }

    if (!confirmPassword) {
      setinput3("Enter your confirmation password");
    } else if (confirmPassword.length < 6) {
      setinput3("password  must be at least 6 characters");
    } else {
      setinput3(null);
    }

    if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
      const datas = {
        oldpassword: oldPassword,
        newpassword: newPassword,
        confirmpassword: confirmPassword,
      };

      axios
        .post(`${BaseUrl}/userroute/changepassword/${Profile.id}`, datas)

        .then((response) => {
          navigate("/userprofile");
        })

        .catch((error) => {
          console.log(error, "error while changing password");
          alert("password change failed");
          if(error.response.status === 401){

            setinput1(error.response.data.message)

          }else if (error.response.data.status === 400){

           setinput1 (error.response.data.message)

          }else if (error.response.data.status === 402){

            setinput3(error.response.data.message)

          }else {
            setinput3(error.response.data.message)
          }
      });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${Bgimage})` }}   >
      <Navbar />
      <div className="mainDiv" style={{ backgroundImage: `url(${Bgimage})` }}   >
        <div className="cardStyle">
   
            
            <h2 className="formTitle">Change your password</h2>
            <div className="inputDiv">
              <label className="inputLabel" htmlFor="password">
                old password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setoldPassword(e.target.value)}
              />
              <p style={{ fontSize: "12px", color: "red", marginLeft: "2px" }}>{input1}</p>
            </div>
            <div className="inputDiv">
              <label className="inputLabel" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setnewPassword(e.target.value)}
              />
              <p style={{ fontSize: "12px", color: "red", marginLeft: "2px" }}>{input2}</p>
            </div>
            <div className="inputDiv">
              <label className="inputLabel" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              <p style={{ fontSize: "12px", color: "red", marginLeft: "2px" }}>{input3}</p>
              <a href="/forgotpassword"> Forgot password</a>
            </div>
            <div className="buttonWrapper">
              <button
                onClick={handlesave}
                type="submit"
                className="primary-btn"
                style={{ border: "none" }}
              >
                Continue
              </button>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Changepassword;
