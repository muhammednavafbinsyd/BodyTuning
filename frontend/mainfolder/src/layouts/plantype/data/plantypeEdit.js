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
function plantypeEdit() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const { id } = useParams();
  const [input1, setInput1] = useState("");
  const [plantype, setplantype] = useState({
    type: "",
  });
  useEffect(() => {
    const fetchplantype =  async (id) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/getplanedit/${id}`);
        setplantype(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchplantype(id);
  },[]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const validationErrors = [];
    if (!plantype.type) {
      setInput1("Type required");
      validationErrors.push("Type must be specified");
    } else {
      setInput1(null);
    }
    if (validationErrors.length === 0) {
      try {
       const data = {
        type:plantype.type
       }
        const response = await axios.put(
          `${BaseUrl}/adminroute/plantypeUpdate/${id}`,
         data,         
        );
        if (response.status === 200) {
          window.location.href = "/plantype";
        }
      } catch (error) {
        console.log(error,"upadte error");
      }
    }
  };
  const handleChange = (e) => {
    setplantype({
      ...plantype,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <BasicLayout title="Update" description="Update Plantype details" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                name="type"
                placeholder="type"
                value={plantype.type}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
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
export default plantypeEdit;
