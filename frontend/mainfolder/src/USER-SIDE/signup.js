import React, { useState } from "react";
import "../assets/usercss/signup.css";
import axios from "axios";
import bgsignup from "../assets/img/banner-bg.jpg"
import SoftTypography from "components/SoftTypography";
function signup() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [ pin,setpin] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [password, setpassword] = useState("");
  const [location, setlocation] = useState("");
  const [ type,settype] = useState("Not Subscribed");
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [input3, setinput3] = useState("");
  const [input4, setinput4] = useState("");
  const [input5, setinput5] = useState("");
  const [input6, setinput6] = useState("");
  const [input7, setinput7] = useState("");
  const [input8, setinput8] = useState("");
  const [invalid,setinvalid] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const validationErrors = [];
    if (!username) {
      setinput1("Enter a username");
      validationErrors.push("Username is required");
    } else {
      setinput1(null);
    }
    if (!email) {
      setinput2("Enter a email");
      validationErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setinput2("Email is not valid");
      validationErrors.push("Invalid email format");
    } else {
      setinput2(null);
    }
    if (!phonenumber) {
      setinput3("Enter a phone number");
      validationErrors.push("Phone number is required");
    } else if (!/^\d{10}$/.test(phonenumber)) {
      setinput3("Phone number is not valid");
      validationErrors.push("Invalid phone number format");
    } else {
      setinput3(null);
    }
    if (!password) {
      setinput4("Enter a password");
      validationErrors.push("Password is required");
    } else if (password.length < 6) {
      setinput4("Password must be at least 6 characters");
      validationErrors.push("Password must be at least 6 characters");
    } else {
      setinput4(null);
    }
    if (!location) {
      setinput5("Enter a location");
      validationErrors.push("Location must be")
    } else {
      setinput5(null);
    }
    if(!city){
      setinput6("City is required");
      validationErrors.push("City is required");
    }else{
      setinput6(null);
    }
    if(!pin){
      setinput7("Pin is required");
      validationErrors.push("Pin is required");
    }else{
      setinput7(null);
    }
    if(!country){
      setinput8("Country is required")
      validationErrors.push("Country is required"); 
    }else{
      setinput8(null);
    }
if(validationErrors.length === 0){
  const signupdata = {
    username: username,
    email: email,
    phonenumber: phonenumber,
    password: password,
    location: location,
    city: city,
    pin: pin,
    country: country,
    type: type,
  };
  axios
    .post(`${BaseUrl}/userroute/signup`, signupdata)
    .then((response) => {
      alert("successfully posted");
      window.location.href = "/login";
      setinvalid("")
    })
    .catch((error) => {
      console.log("error posting", error);
      if(error.response && error.response.status === 400){
      setinvalid("Email is already exist");
      }
    });
}
  };
  return (
  <div className="main_sec" style={{backgroundImage:`url(${bgsignup})`}}  >
      <div className="container__child signup__form">
        <div className="form-group">
          {/* <label htmlFor="username">Username</label> */}
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
            onChange={(e) => setusername(e.target.value)}
          />
         <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input1}</p>
          </SoftTypography>
        </div>
        <div className="form-group">
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            placeholder="@Emailaddress"
            required
            onChange={(e) => setemail(e.target.value)}
          />
          <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input2}</p>
          </SoftTypography>
         { invalid && <p style={{color:'red'}}  >{invalid}</p>}
        </div>      
        <div className="form-group">
          {/* <label htmlFor="Phone number">Phone number</label> */}
          <input
            className="form-control"
            type="number"
            name="number"
            id="number"
            placeholder="Enter your phonenumber"
            required
            onChange={(e) => setphonenumber(e.target.value)}
          />
         <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input3}</p>
          </SoftTypography>
        </div>
        <div className="form-group">
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password"
            required
            onChange={(e) => setpassword(e.target.value)}
          />
         <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input4}</p>
          </SoftTypography>
        </div>
        <div className="form-group">
          {/* <label htmlFor="passwordRepeat">Location</label> */}
          <input
            className="form-control"
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location"
            required
            onChange={(e) => setlocation(e.target.value)}
          />
          <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input5}</p>
          </SoftTypography>
        </div>
        <div className="form-group">
          <input
          className="form-control"
          name="city"
          placeholder="City"
          id="city"
          onChange={(e) => setcity(e.target.value)}
          >
          </input>
          <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input6}</p>
          </SoftTypography>
        </div>
        <div className="form-group">
          {/* <label htmlFor="pin">Pin</label> */}
          <input
          className="form-control"
          name="pin"
          placeholder="PIN"
          id="pin"
          onChange={(e) => setpin(e.target.value)}
          >
          </input>
          <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input7}</p>
          </SoftTypography>
        </div>
        <div className="form-group">
          {/* <label htmlFor="country" >Country</label> */}
          <input
          className="form-control"
          name="country"
          placeholder="Country"
          onChange={(e) => setcountry(e.target.value)}
          >
          </input>
          <SoftTypography className="typo" >
          <p style={{color:'red'}}  >{input8}</p>
          </SoftTypography>
        </div>
        <div className="m-t-lg">
          <ul className="list-inline">
            <li>
              <input
                className="btn btn--form"
                type="submit"
                defaultValue="Register"
                onClick={handlesubmit}
              />
            </li>
            <li>
              <a className="signup__link" href="/login">
                I am already a member
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default signup;
