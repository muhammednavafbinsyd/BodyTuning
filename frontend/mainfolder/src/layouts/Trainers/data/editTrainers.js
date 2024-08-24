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
import { useCallback, useEffect, useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import curved6 from "assets/images/illustrations/rocket-white.png";
import axios from "axios";
import data from "layouts/dashboard/components/Projects/data";
import { IeOutlined } from "@ant-design/icons";
function EditTrainers() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [invalid, setinvalid] = useState("");
  const [type,settype]= useState([])
  const [trainersData, settrainersData] = useState({
    image: [],
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    status: "",
    type: "",
  });
  const typeofplan = async()=>{
    try{
    const response = await axios.get(`${BaseUrl}/adminroute/plantypeGet`)
    settype(response.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    const fetchdata = useCallback(async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/tarinersedit/${id}`);
        const data = response.data;
        settrainersData(data);
        setlist(data);
      } catch (err) {
        console.log(err);
      }
    }, [id]);
    fetchdata();
    typeofplan();
  }, [fetchdata]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const data = new FormData();
      data.append("firstname", trainersData.firstname);
      data.append("lastname", trainersData.lastname);
      data.append("email", trainersData.email);
      data.append("contact", trainersData.contact);
      data.append("description", trainersData.description);
      data.append("status", trainersData.status);
      data.append("type", trainersData.type);
      if (trainersData.image.length > 0) {
        for (let i = 0; i < trainersData.image.length; i++) {
          data.append("image", trainersData.image[i]);
        }
      }
      const response = await axios.put(
        `${BaseUrl}/adminroute/trainersupdate/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        window.location.href = "/Trianers";
        setinvalid("");
      }
    } catch (err) {
      if (err.response.status === 400) {
        setinvalid("Email is already exist");
      }
      console.log(err, "error trainers data updating");
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    settrainersData({
      ...trainersData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = Array.from(e.target.files);
    settrainersData((prevtrainersData) => ({
      ...prevtrainersData,
      image: file,
    }));
  };
  return (
    <BasicLayout title="Edit and update" image={curved6} description="Edit trainers details">
      <Card>
        <SoftBox p={3} mb={1} textAlign="center"></SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <input
                multiple
                accept="image/*"
                type="file"
                placeholder="image"
                onChange={handleImageChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="firstname"
                placeholder="First-name"
                value={trainersData.firstname}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="lastname"
                placeholder="Last-name"
                value={trainersData.lastname}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="email"
                type="email"
                placeholder="Email"
                value={trainersData.email}
                onChange={handleChange}
              />
            </SoftBox>
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{invalid}</p>
            <SoftBox mb={2}>
              <SoftInput
                name="contact"
                type="tel"
                placeholder="Contact"
                value={trainersData.contact}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <textarea
                name="description"
                onChange={handleChange}
                type="text"
                placeholder="Description"
                value={trainersData.description}
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  fontSize: "14px",
                  paddingLeft: "4px",
                  outline: "none",
                }}
              />
            </SoftBox>
            <select name="type" value={trainersData.type} id="Active-Deactive" onChange={handleChange}>
              {type.map((item, index) => (
                <option value={item._id} key={index}>{item.type}</option>
              ))}
            </select>
            <select name="status" id="Active-Deactive" onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
            <SoftBox></SoftBox>
            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleUpdate}>
                update
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center"></SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}
export default EditTrainers;
