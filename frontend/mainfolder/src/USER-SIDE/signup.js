import React, { useState } from "react";
import axios from "axios";
import bgsignup from "../assets/img/pexels-cesar-galeao-1673528-3289711.jpg"
import SoftTypography from "components/SoftTypography";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success("Successfully Created Account!", {
        position: "top-center",
      });
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
  <div className="h-auto py-16" style={{backgroundImage:`url(${bgsignup})`,backgroundSize:'cover', 
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',}}  >
      <ToastContainer />
      <div className="max-w-xs mx-auto backdrop-blur-none  bg-white/30 rounded-xl overflow-hidden md:max-w-2xl p-4">
         <div className="max-w-xs mx-auto">
          <h3 className="text-blue-600"> Create Your Acoount </h3>
         </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold mb-2">USER NAME</label>
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
          <label className="block text-black text-xs font-bold mb-2">EMAIL</label>
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
          <label className="block text-black text-xs font-bold mb-2">PHONE NUMBER</label>
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
          <label className="block text-black text-xs font-bold mb-2">PASSWORD</label>
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
          <label className="block text-black text-xs font-bold mb-2">LOCATION</label>
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
        <label className="block text-black text-xs font-bold mb-2">CITY</label>
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
          <label className="block text-black text-xs font-bold mb-2">PIN</label>
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
          <label className="block text-black text-xs font-bold mb-2">COUNTRY</label>
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
          <ul className="list-inline py-2">
            <li>
              <Button onClick={handlesubmit} className="text-black bg-transparent "  type="submit">
              SIGN UP
              </Button>
            </li>
            <li>
              <a className="text-blue  text-sm" href="/login">
                I AM ALREADY A MEMBER
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default signup;
