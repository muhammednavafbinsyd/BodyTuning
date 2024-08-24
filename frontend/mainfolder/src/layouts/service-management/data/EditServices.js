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
import { useState,useEffect } from "react";
// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useParams } from "react-router-dom";
function Editservices() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [serviceEdit,setServiceEdit] = useState({
    image: null,
    title:"",
    description:"",
  });
  useEffect(() => {
    const fetchServiceData = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/ServiceEdit/${id}`);
        const data = response.data;
        setServiceEdit(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchServiceData();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const validationErrors = [];
    if (!serviceEdit.image) {
      setInput1("image required");
      validationErrors.push("image is required");
    }else{
      setInput1("");
    }
    if(!serviceEdit.title){
        setInput2 ("title required");
        validationErrors.push("title is required");
    }else{
        setInput2(null);
    }
    if(!serviceEdit.description){
        setInput3("description required");
        validationErrors.push("description is required");
    }else{
        setInput3(null)
    }
if(validationErrors.length === 0){
  try {
    var formData = new FormData();
    formData.append("title", serviceEdit.title);
    formData.append("description", serviceEdit.description);
    if (serviceEdit.image) {
        formData.append("image",serviceEdit.image);
      }
    const response = await axios.put(
      `${BaseUrl}/adminroute/serviceUpdate/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("success")
    if (response.status === 200) {
      window.location.href = "/services";
    }
  } catch (err) {
    console.error("Error updating user:", err);
  } 
}
  };
  const handleChange = (e) => {
    setServiceEdit({
      ...serviceEdit,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setServiceEdit((prevServiceEdit) => ({
      ...prevServiceEdit,
      image: file,
    }));
  };
  return (
    <BasicLayout title="Update" description="Update your users' details" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
  
            <SoftBox mb={2}>
              <SoftInput
                type="file"
                // value={userEdit.image} value property dont use image fiel
                onChange={handleImageChange}
                accept="image/*"
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="title"
                placeholder="Title"
                value={serviceEdit.title}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input2}</p>
            </SoftBox>
            <SoftBox>
            <textarea
              style={{
                width: "100%",
                borderRadius: "7px",
                fontSize: "14px",
                paddingLeft: "4px",
                outline: "none",
              }}
              name="description"
              placeholder="Description"
              type="text"
              onChange={handleChange}
              value={serviceEdit.description}
            />
            <p style={{ fontSize: "10px", color: "red" }}>{input3}</p>
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
export default Editservices ;
