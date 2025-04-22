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
function TestimonialEdit() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [testimonial, setTestimonial] = useState({
    image: null,
    title: "",
    description: "",
  });
  useEffect(() => {
    const fetchTestimonial =  async (id) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/testimonialForEdit/${id}`);
        setTestimonial(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTestimonial(id);
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const validationErrors = [];
    if (!testimonial.image) {
      setInput1("Image required");
      validationErrors.push("image must be specified");
    } else {
      setInput1(null);
    }
    if (!testimonial.title) {
      setInput2("Title required");
      validationErrors.push("title must be specified");
    } else {
      setInput2(null);
    }

    if (!testimonial.description) {
      setInput3("Description required");
      validationErrors.push("description must be specified");
    } else {
      setInput3(null);
    }
    if (validationErrors.length === 0) {
      try {
        var data = new FormData();
        data.append("title", testimonial.title);
        data.append("description", testimonial.description);
        if (testimonial.image) {
          data.append("image",testimonial.image);
        }
        const response = await axios.put(
          `${BaseUrl}/adminroute/testimonialUpdate/${id}`,
          data,
          {
            headers: {
              "Content-Type":"multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          window.location.href = "/testimonial";
        }
      } catch (error) {
        console.log(error,"upadte error");
      }
    }
  };
  const handleChange = (e) => {
    setTestimonial({
      ...testimonial,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setTestimonial((prevTestimonialEdit) => ({
      ...prevTestimonialEdit,
      image: file,
    }));
  };
  return (
    <BasicLayout title="Update" description="Update your users' details" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput type="file" onChange={handleImageChange} accept="image/*" />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="title"
                placeholder="Title"
                value={testimonial.title}
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
                value={testimonial.description}
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
export default TestimonialEdit;
