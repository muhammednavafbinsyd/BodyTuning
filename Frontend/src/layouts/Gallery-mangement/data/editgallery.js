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
import TextField from "@mui/material/TextField";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useParams } from "react-router-dom";
function plantypeEdit() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const { id } = useParams();
  const [input1, setInput1] = useState("");
  const [galleryedit, setgalleryedit] = useState({
    image: null,
    category: "",
  });
  console.log(galleryedit, "6666767");
  const fetchgallery = async (id) => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(`${BaseUrl}/adminroute/galleryedit/${id}`);
      setgalleryedit(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchgallery(id);
  }, []);
  const handleUpdate =  (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const validationErrors = [];
    if (!galleryedit.image) {
      setInput1("image is required");
      validationErrors.push("image is required");
    } else {
      setInput1(null);
    }
    if (validationErrors.length === 0) {   
        const data = new FormData();
        data.append("image", galleryedit.image);
        data.append("category", galleryedit.category);
        axios.put(
          `${BaseUrl}/adminroute/galleryUpdate/${id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
            if (response.status === 200) {
                window.location.href = "/gallery2";
              }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      } 
    }
  const handleChange = (e) => {
    setgalleryedit({
      ...galleryedit,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <BasicLayout title="Update" description="Update Gallery details" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                accept="image/*"
                type="file"
                fullWidth
                onChange={(e) => setgalleryedit({ ...galleryedit, image: e.target.files[0] })}
              />
              <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
            </SoftBox>
            <select onChange={handleChange} value={galleryedit.category}>
              <option>Fitness</option>
              <option>Coaching</option>
              <option>Event</option>
              <option>Others</option>
            </select>
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
