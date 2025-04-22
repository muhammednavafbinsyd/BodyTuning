import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import bglogin from "../assets/img/banner-bg.jpg";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [invalid, setinvalid] = useState("");
  const [userId, setUserId] = useState("");
  const [list, setlist] = useState("");
  function handleLogin(event) {
    event.preventDefault();  
    if (input1 === "" && input2 === "") {
      setinvalid("Enter email or password");
    } else {
      const userdata = {
        input1: input1,
        input2: input2,
      };
      axios
        .post(`${BaseUrl}/userroute/login`, userdata)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("usertoken", response.data.usertoken);
            localStorage.setItem("userProfile", JSON.stringify(response.data.user));
            setUserId(response.data.user.id);
            packagecheck(response.data.user.id);
            toast.success("Successfully Logged In!", {
              position: "top-center",
            });
            setTimeout(() => {
              navigate("/");
            }, 1500); 
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to Log In!", {
            position: "top-center",
          });
          setinvalid("Invalid email or password");
        });
    }
  }
  const herotext ={
    color:"#f15d44"
  } 
  const packagecheck = async (userId) => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/packagecheking/${userId}`);
      setlist(response.data.data);
      const appliedPackage = {
        packageId: response.data.data._id,
        packageName: response.data.data.membershiptype,
        duration: response.data.data.duration,
        monthlyFee: response.data.data.monthlyfee,
        enrollmentFee: response.data.data.onetimeentrollmentfee,
        status: response.data.data.status,
      };
      localStorage.setItem("appliedPackage", JSON.stringify(appliedPackage));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="py-72" style={{ backgroundImage: `url(${bglogin})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <ToastContainer/>
      <form onSubmit={handleLogin} className="max-w-xs mx-auto backdrop-blur-none bg-white/30 rounded-xl overflow-hidden md:max-w-2xl p-4">
        <div className="max-w-xs mx-auto">
          <h3 className="text-blue-600 text-center" style={herotext}> HELLO SIGN IN!</h3>
        </div>
        {invalid && <p className="text-red-600">{invalid}</p>}
        <div className="form-group">
          <label className="block text-black text-xs font-bold py-2">EMAIL</label>
          <TextField
            fullWidth
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
            onChange={(e) => setinput1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="block text-black text-xs font-bold py-2">PASSWORD</label>
          <TextField
            fullWidth
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setinput2(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className="m-t-lg">
          <ul className="list-inline py-2">
            <li>
              <Button className="text-black bg-transparent" style={{borderRadius:0 ,borderColor:'#f15d44'}}   type="submit">
              <span style={{color:'#ffff'}}> SIGN IN</span>
              </Button>
            </li>
            <Link to="/signup" className="text-blue-600 text-xs" style={herotext} >
              CREATE ACCOUNT ?&nbsp;&nbsp;
            </Link>
            <Link className="text-white text-xs" to="/forgotpassword">
              FORGOT PASSWORD ?
            </Link>
          </ul>
        </div>
      </form>
    </div>
  );
}
export default Login;
