/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";
// react-router-dom components
import { Link ,useNavigate} from "react-router-dom";
// @mui material components
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Images
import curved9 from "assets/images/curved-images/white-curved.jpeg";
import axios from "axios";
function SignIn() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const naviate = useNavigate()
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [invalid, setinvalid] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  function btn(event) {
    event.preventDefault();
    if (input1 === "" && input2 === "") {
      setinvalid("Enter email or password");
    } else {
      const admindata = {
        input1: input1,
        input2: input2,
      };
      axios
        .post(`${BaseUrl}/adminroute/admin`, admindata)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("adminprofile",JSON.stringify(response.data.admin));       
          }      
          naviate("/dashboard")
        })
        .catch((err) => {
          console.log(err);
          setinvalid("invalid email or password");
      });
    }
  }
  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <form  role="form" onSubmit={btn}>
        <SoftBox mb={3}>
          <SoftBox mb={1} ml={0.5}>
            {invalid && <p style={{ color: "red" }}>{invalid}</p>}
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput onChange={(e) => setinput1(e.target.value)} type="email" placeholder="Email" />
        </SoftBox>
        <SoftBox mb={3}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
          Password
          </SoftTypography>
          <SoftInput
            onChange={(e) => setinput2(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            endAdornment={
              <InputAdornment 
                style={{ position: "relative", left: "9rem", bottom: "10px", cursor: "pointer", fontSize:"larger" }}
              >
                {showPassword ? (
                  <Visibility onClick={togglePasswordVisibility} />
                ) : (
                  <VisibilityOff onClick={togglePasswordVisibility} />
                )}
              </InputAdornment>
            }
          />
        </SoftBox>
          <Link style={{position:"relative", left:"13rem" ,bottom:"27px" ,fontSize:"small"}} to={"/forgetpassword"}>Forgot password?</Link>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
      </form>
    </CoverLayout>
  );
}
export default SignIn;
