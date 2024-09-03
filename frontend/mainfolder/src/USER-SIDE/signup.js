import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import bgsignup from "../assets/img/pexels-cesar-galeao-1673528-3289711.jpg"
import SoftTypography from "components/SoftTypography";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { Link ,useNavigate } from "react-router-dom";

function Signup() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Not Subscribed");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");
  const [input8, setInput8] = useState("");
  const [invalid, setInvalid] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];
    if (!username) {
      setInput1("Enter a username");
      validationErrors.push("Username is required");
    } else {
      setInput1(null);
    }
    if (!email) {
      setInput2("Enter an email");
      validationErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setInput2("Email is not valid");
      validationErrors.push("Invalid email format");
    } else {
      setInput2(null);
    }
    if (!phonenumber) {
      setInput3("Enter a phone number");
      validationErrors.push("Phone number is required");
    } else if (!/^\d{10}$/.test(phonenumber)) {
      setInput3("Phone number is not valid");
      validationErrors.push("Invalid phone number format");
    } else {
      setInput3(null);
    }
    if (!password) {
      setInput4("Enter a password");
      validationErrors.push("Password is required");
    } else if (password.length < 6) {
      setInput4("Password must be at least 6 characters");
      validationErrors.push("Password must be at least 6 characters");
    } else {
      setInput4(null);
    }
    if (!location) {
      setInput5("Enter a location");
      validationErrors.push("Location is required");
    } else {
      setInput5(null);
    }
    if (!city) {
      setInput6("City is required");
      validationErrors.push("City is required");
    } else {
      setInput6(null);
    }
    if (!pin) {
      setInput7("Pin is required");
      validationErrors.push("Pin is required");
    } else {
      setInput7(null);
    }
    if (!country) {
      setInput8("Country is required");
      validationErrors.push("Country is required");
    } else {
      setInput8(null);
    }

    if (validationErrors.length === 0) {
      const signupData = {
        username,
        email,
        phonenumber,
        password,
        location,
        city,
        pin,
        country,
        type,
      };
      axios
        .post(`${BaseUrl}/userroute/signup`, signupData)
        .then((response) => {
          toast.success("Successfully Created Account!",{
            position: "top-center",
          });
          navigate("/");
          setInvalid("");
        })
        .catch((error) => {
          console.log("error posting", error);
          if (error.response && error.response.status === 400) {
            setInvalid("Email already exists");
          }
        });
    }
  };
  const herotext ={
    color:"#f15d44"
  } 
  return (
    <div
      className="h-auto py-16"
      style={{
        backgroundImage: `url(${bgsignup})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto backdrop-blur-none bg-white/30 rounded-xl overflow-hidden md:max-w-2xl p-4">
        <div className="max-w-sm mx-auto">
          <h3 className="text-blue-600" style={herotext}>CREATE YOUR ACCOUNT </h3>
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">USER NAME</label>
          <TextField
            className="form-control"
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            autoComplete="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {input1 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input1}</div>
            </SoftTypography>
          )}
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">EMAIL</label>
          <TextField
            className="form-control"
            type="text"
            name="email"
            id="email"
            placeholder="@emailaddress"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {input2 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input2}</div>
            </SoftTypography>
          )}
          {invalid && <div style={{ color: 'red' }}>{invalid}</div>}
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">PHONE NUMBER</label>
          <TextField
            className="form-control"
            type="tel"
            name="number"
            id="number"
            placeholder="Enter your phonenumber"
            autoComplete="phone-number"
            required
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          {input3 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input3}</div>
            </SoftTypography>
          )}
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">PASSWORD</label>
          <TextField
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password"
            autoComplete="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {input4 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input4}</div>
            </SoftTypography>
          )}
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">LOCATION</label>
          <TextField
            className="form-control"
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location"
            autoComplete="location"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
          {input5 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input5}</div>
            </SoftTypography> 
          )}
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">CITY</label>
          <TextField
            className="form-control"
            type="text"
            name="city"
            id="city"
            placeholder="City"
            autoComplete="city"
            onChange={(e) => setCity(e.target.value)}
          />
          {input6 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input6}</div>
            </SoftTypography>
          )}
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">PIN</label>
          <TextField
            className="form-control"
            type="text"
            name="pin"
            placeholder="PIN"
            id="pin"
            autoComplete="pin"
            onChange={(e) => setPin(e.target.value)}
          />
          {input7 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input7}</div>
            </SoftTypography>
          )}
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">COUNTRY</label>
          <TextField
            className="form-control"
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            autoComplete="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          {input8 && (
            <SoftTypography className="typo">
              <div style={{ color: 'red' }}>{input8}</div>
            </SoftTypography>
          )}
        </div>
        <div className="m-t-lg">
          <ul className="list-inline py-2">
            <li>
              <Button className="text-black bg-transparent" type="submit"  style={{borderRadius:0 ,borderColor:'#f15d44'}} >
               <span style={{color:'#ffff'}}> SIGN UP</span>
              </Button>
            </li>
            <li>
              <Link className="text-xs text-white"  to="/login">
                I AM ALREADY A MEMBER ?
              </Link>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
export default Signup;
