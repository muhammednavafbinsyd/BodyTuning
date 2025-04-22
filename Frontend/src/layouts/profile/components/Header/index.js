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
import { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import EditIcon from '@mui/icons-material/Edit';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {Link} from "react-router-dom";
import axios from "axios";
// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { fabClasses } from "@mui/material";
import { Password } from "@mui/icons-material";
function Header() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const storedUserProfile = JSON.parse(localStorage.getItem("adminprofile"));
  const [AdminProfile, setAdminProfile] = useState(storedUserProfile);
  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleSave = async () => {
    const datas = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `${BaseUrl}/adminroute/ChangePassword/${AdminProfile.id}`,
        datas
      );
      setShow(false);
      const data = await response.data;
      setError1("");
      setError2("");
    } catch (err) {
      console.log(err);
      if (oldPassword == "") {
        setError1("Enter your old password");
      } else {
        setError1(null);
      }
      if (newPassword == "") {
        setError2("Enter your new password");
      } else {
        setError2(null);
      }
    }
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log(AdminProfile.id);
  };
  const handleChange = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setError1("");
    setError2("");
  };
  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={`${BaseUrl}/${AdminProfile.image}`}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {AdminProfile.username}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {AdminProfile.role}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="Edit" icon={<EditIcon />} />
                <Tab label="Change password" onClick={handleChange} icon={<LockResetRoundedIcon />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="oldPassword">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter old password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputAdornment
                style={{ position: "relative", left: "27rem", bottom: "17px", cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Visibility />: <VisibilityOff />}
              </InputAdornment>
            </Form.Group>
             <Link style={{position:"relative", left:"22rem" ,bottom:"7px" ,fontSize:"x-small"}} to = "/forgetpassword">Forgot password?</Link>
            <p style={{ color: "red", fontSize: "10px", marginLeft: "1rem" }}>{error1} </p>
            <Form.Group controlId="newPassword">
              <Form.Control
                type={showPassword2 ? "text": "password"}
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputAdornment
                style={{ position: "relative", left: "27rem", bottom: "17px", cursor: "pointer" }}
                onClick={togglePasswordVisibility2}
               >
                {showPassword2 ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            </Form.Group>
            <p style={{ color: "red", fontSize: "10px", marginLeft: "1rem" }}>{error2} </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </SoftBox>
  );
}
export default Header;
