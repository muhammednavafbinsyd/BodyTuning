import React, { useState } from "react";
import axios from "axios";
import bglogin from "../assets/img/banner-bg.jpg";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function login() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [invalid, setinvalid] = useState("");
  const [userId, setUserId] = useState("");
  const [list, setlist] = useState("");

  function Login() {
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
          }
          toast.success("Successfully Logged In!", {
            position: "top-center",
          });
          window.location.href="/home"
        })
        .catch((err) => {
          console.log(err)
          toast.error("Failed to Log In!", {
            position: "top-center",
          });
          setinvalid("Invalid email or password");
        });
    }
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
  }}
    >
      <ToastContainer 
         />
      <div type="form" className="max-w-xs mx-auto backdrop-blur-none  bg-white/30 rounded-xl overflow-hidden md:max-w-2xl p-4" >
      <div className="max-w-xs mx-auto ">
          <h3 className="text-blue-600 text-center"> Hello Sign in !</h3>
         </div>
        {invalid && <p  className="text-red-600" >{invalid}</p>}
        <div className="form-group">

          <label className="block  text-black text-xs font-bold py-2">EMAIL</label>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setinput1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="block  text-black text-xs font-bold py-2">PASSWORD</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setinput2(e.target.value)}
          />
        </div>
        <div className="m-t-lg">
          <ul className="list-inline py-2">
            <li>
              <Button className="text-black bg-transparent " onClick={Login} type="submit">
              SIGN IN
              </Button>
            </li>
            <a className="text-blue  text-sm" href="/signup">
                CREATE ACCOUNT?&nbsp;&nbsp;
              </a>
            <a className="text-white text-xs " href="/forgotpassword">
             FORGOT PASSWORD
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default login;
