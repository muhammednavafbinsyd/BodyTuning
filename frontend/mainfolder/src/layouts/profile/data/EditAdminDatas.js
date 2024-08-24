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
import { useEffect, useState } from "react";
import axios from "axios";
// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Label } from "@mui/icons-material";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import curved6 from "assets/images/curved-images/curved1.jpg";
function EditAdminDatas() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const storedUserProfile = JSON.parse(localStorage.getItem("adminprofile"));
  const [AdminProfile, setAdminProfile] = useState({});
  const navigate = useNavigate("");
  const { id } = useParams();
  useEffect(() => {
    const storedUserProfile = JSON.parse(localStorage.getItem("adminprofile")) || {};
    setAdminProfile(storedUserProfile);
  }, []);
  const handleUpdate = async (e) => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("image", AdminProfile.image);
      data.append("fullname", AdminProfile.fullname);
      data.append("username", AdminProfile.username);
      data.append("email", AdminProfile.email);
      data.append("contact", AdminProfile.contact);
      data.append("location", AdminProfile.location);
      data.append("role", AdminProfile.role);
      data.append("description", AdminProfile.description);
      const response = await axios.put(
        `${BaseUrl}/adminroute/adminUpdateData/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("admin deta updated successfully");
        alert("data updated successfully");
        console.log(response.data.profile);
        localStorage.setItem("adminprofile", JSON.stringify(response.data.profile));
        navigate("/profile");
        console.log("About to redirect to /profile");
      }
    } catch (err) {
      console.error("error updating admin:", err);
    }
  };
  const handleChange = (e) => {
    setAdminProfile({
      ...AdminProfile,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAdminProfile((prevAdmindataData) => ({
      ...prevAdmindataData,
      image: file,
    }));
  };
  return (
    <BasicLayout
      title="Update"
      description="Use these awesome forms to edit your admin profile."
      image={curved6}
    >
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Fullname"
                name="fullname"
                type="text"
                value={AdminProfile.fullname}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Username"
                name="username"
                value={AdminProfile.username}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                name="email"
                value={AdminProfile.email}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="number"
                placeholder="Contact"
                name="contact"
                value={AdminProfile.contact}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="location"
                name="location"
                value={AdminProfile.location}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox  mb={2}>
              <SoftInput 
              type="text"
              placeholder="Role"
              name="role" 
              value={AdminProfile.role} 
              onChange={handleChange}
            />
            </SoftBox>
            <SoftBox  mb={2}>
              <SoftInput
              type="text"
              placeholder="Description"
                name="description"
                value={AdminProfile.description}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="file"
                placeholder="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                maxwidth="sm"
                fullWidth
                onClick={handleUpdate}
              >
                Save changes
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}
export default EditAdminDatas;
