import React, { useEffect, useState } from "react";
import "../assets/usercss/signup.css";
import axios from "axios";
import bglogin from "../assets/img/banner-bg.jpg";
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

          window.location.href = "/home";
          alert("successfully logged in");
        })
        .catch((err) => {
          console.log(err)
          alert("failed to login");
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
    <div className="main_sec" style={{ backgroundImage: `url(${bglogin})` }}>
      <div  type="form" className="container__child signup__form" >
        {invalid && <p style={{ color: "red" }}>{invalid}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
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
          <ul className="list-inline">
            <li>
              <input
                className="btn btn--form"
                type="submit"
                defaultValue="Register"
                onClick={Login}
              />
            </li>

            <a className="signup__link" href="/forgotpassword">
              <a className="signup__link." href="/signup">
                create account?{" "}
              </a>
              Forgot Password
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default login;
