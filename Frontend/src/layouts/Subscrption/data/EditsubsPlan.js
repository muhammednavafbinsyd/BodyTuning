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
import curved6 from "assets/images/curved-images/white-curved.jpeg";
import { useParams } from "react-router-dom";
function Editsubscriptiondata() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [subsEdit, setsubsEdit] = useState({
    membershiptype: "",
    duration: "",
    monthlyfee: "",
    onetimeentrollmentfee: "",
    additionalbenefits: "",
  });
  useEffect(() => {
    const fetchsubsData = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/subscriptionsedit/${id}`);
        const data = response.data;
        setsubsEdit(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchsubsData();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      membershiptype: subsEdit.membershiptype,
      duration: subsEdit.duration,
      monthlyfee: subsEdit.monthlyfee,
      onetimeentrollmentfee: subsEdit.onetimeentrollmentfee,
      additionalbenefits: subsEdit.additionalbenefits,
    };
    // try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .put(`${BaseUrl}/adminroute/subscriptionUpdate/${id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/subscription";
        }
      })
      .catch((err) => {
        console.error("Error updating Subscriptions:", err);
        alert("Error updating Subscriptions");
      });
    if (subsEdit.membershiptype.length < 1) {
      setInput1("Enter a memebership type");
    } else {
      setInput1(null);
    }
    if (subsEdit.duration.length < 1) {
      setInput2("Enter a duration");
    } else {
      setInput2(null);
    }
    if (subsEdit.monthlyfee.length < 1) {
      setInput3("Enter a monthly fee");
    } else {
      setInput3(null);
    }
    if (subsEdit.onetimeentrollmentfee.length < 1) {
      setInput4("Enter a onetime entrollemt fee");
    } else {
      setInput4(null);
    }
    if (subsEdit.additionalbenefits.length < 1) {
      setInput5("Enter a additionalbenefites");
    } else {
      setInput5(null);
    }
  };
  const handleChange = (e) => {
    setsubsEdit({
      ...subsEdit,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <BasicLayout title="Update" description="supbscription" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                name="membershiptype"
                type="text"
                placeholder="Membership Type"
                value={subsEdit.membershiptype}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="Duration"
                value={subsEdit.duration}
                onChange={handleChange}
                name="duration"
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input2}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="monthlyfee"
                type="text"
                placeholder="Monthly Fee"
                value={subsEdit.monthlyfee}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input3}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="onetimeentrollmentfee"
                type="text"
                placeholder="One-Time Enrollment Fee"
                value={subsEdit.onetimeentrollmentfee}
                onChange={handleChange}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input4}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="additionalbenefits"
                type="text"
                placeholder="Additional Benefits"
                value={subsEdit.additionalbenefits}
                onChange={handleChange}
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
export default Editsubscriptiondata;
