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
import { useState, useCallback, useEffect } from "react";
// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useParams,useNavigate } from "react-router-dom";
function EditUser() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const { id } = useParams();
  const [invalid, setinvalid] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [userEdit, setUserEdit] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    image: null,
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/userEdit/${id}`);
        const data = response.data;
        setUserEdit(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserData();
  }, []);
  const handleUpdate = async (e) => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const validationErrors = [];
    e.preventDefault();
    if (!userEdit.userName) {
      setInput1("Enter a userName");
      validationErrors.push("Username is required");
    }else{
      setInput1("");
    }
    if(!userEdit.email){
      setInput2("Enter a email");
      validationErrors.push("Email is required");
    }else if(!/\S+@\S+\.\S+/.test(userEdit.email)){
      setInput2("Enter valid email");
      validationErrors.push("Invalid email format");
    }else{
      setInput2("")
    }
    if(!userEdit.phoneNumber){
      setInput3("Enter a Phone Number")
      validationErrors.push("Phone number is required");
    }else if(!/^\d{10}$/.test(userEdit.phoneNumber)){
      setInput3("Phone Number is not valid")
      validationErrors.push("Invalid phone number format");
    }else{
      setInput3("")
    }
    if (!userEdit.password) {
      setInput4("Enter a Password");
      validationErrors.push("Password is required");
    } else if (userEdit.password.length < 6) {
      setInput4("Password must be at least 6 characters");
      validationErrors.push("Password must be at least 6 characters");     
    }else{
      setInput4("")
    }
    if(userEdit.image == ""){
      setInput5("Upload a image")
      validationErrors.push("Image is required");
    }else{
      setInput5("")
    }
if(validationErrors.length === 0){
  try {
    const formData = new FormData();
    formData.append("userName", userEdit.userName);
    formData.append("email", userEdit.email);
    formData.append("phoneNumber", userEdit.phoneNumber);
    formData.append("password", userEdit.password);
    if (userEdit.image) {
      formData.append("image", userEdit.image);
    }
    const response = await axios.put(
      `${BaseUrl}/adminroute/userUpdate/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      setinvalid("");
      navigate("/users");
    }
  } catch (err) {
    if (err.response.status === 400) {
      setinvalid("Email is already exist");
    }
    console.error("Error updating user:", err);
  }
} 
  };
  const handleChange = (e) => {
    setUserEdit({
      ...userEdit,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setUserEdit((prevUserEdit) => ({
      ...prevUserEdit,
      image: file,
    }));
  };
  const toggleEye = () => {
    setshowPassword(!showPassword);
  };
  return (
    <BasicLayout title="Update" description="Update your users' details" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                name="userName"
                placeholder="Name"
                value={userEdit.userName}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="email"
                type="email"
                placeholder="Email"
                value={userEdit.email}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input2}</p>
            </SoftBox>
            <SoftBox mb={1} ml={0.5}>
              {invalid && <p style={{ fontSize: "10px",marginLeft: ".5rem",  color: "red" }}>{invalid}</p>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="phoneNumber"
                type="number"
                placeholder="Phone Number"
                value={userEdit.phoneNumber}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input3}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={userEdit.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "17px",
                      cursor: "pointer",
                    }}
                    onClick={toggleEye}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                }
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input4}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input5}</p>
            </SoftBox>
            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleUpdate}>
                Update
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center"></SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}
export default EditUser;
