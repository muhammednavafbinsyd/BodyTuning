import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import usersTableData from "layouts/user-management/data/authorsTableData";
import axios from "axios";
import { Fade, Grow, Slide, Zoom } from "@mui/material";
import SoftInput from "components/SoftInput";
import DialogContentText from "assets/theme/components/dialog/dialogContent";
import { Height, ZoomIn, ZoomOut } from "@mui/icons-material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
function Tables() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { columns, rows } = usersTableData();
  const [invalid, setinvalid] = useState("");
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState([]);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const toggleEye = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Initialize an array to store validation errors
    const validationErrors = [];
    if (!userName) {
      setInput1("Enter a UserName");
      validationErrors.push("Username is required");
    } else {
      setInput1(null);
    }
    if (!email.trim()) {
      setInput2("Enter an Email");
      validationErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setInput2("Email is not valid");
      validationErrors.push("Invalid email format");
    } else {
      setInput2(null);
    }
    if (!phoneNumber.trim()) {
      setInput3("Enter a Phone Number");
      validationErrors.push("Phone number is required");
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setInput3("Phone Number is not valid");
      validationErrors.push("Invalid phone number format");
    } else {
      setInput3(null);
    }
    if (!password.trim()) {
      setInput4("Enter a Password");
      validationErrors.push("Password is required");
    } else if (password.length < 6) {
      setInput4("Password must be at least 6 characters");
      validationErrors.push("Password must be at least 6 characters");
    } else {
      setInput4(null);
    }
    if (image.length === 0) {
      setInput5("Upload an image");
      validationErrors.push("Image is required");
    } else {
      setInput5(null);
    }
    // Check if there are any validation errors
    if (validationErrors.length === 0) {
      // If no errors, proceed with form submission
      const formData = {
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        image: image,
      };
      axios
        .post(`${BaseUrl}/adminroute/userPost`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          handleClose();
          window.location.href = "/users";
          setinvalid("");
        })
        .catch((error) => {
          console.log("error posting data", error);
          if (error.response && error.response.status === 400) {
            setinvalid("Email is already exist");
          }
        });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setInput1(null);
    setInput2(null);
    setInput3(null);
    setInput4(null);
    setInput5(null);
  };
  const dialogStyle = {
    borderRadius: "10px",
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Users</SoftTypography>
              <Button variant="contained" onClick={handleOpen}>
                Add User
              </Button>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Zoom}
        transitionDuration={380}
        keepMounted
        PaperProps={{ style: dialogStyle }}
      >
        <DialogTitle>User Form</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="userName"
            name="userName"
            placeholder="User name"
            type="text"
            fullWidth
            onChange={(e) => setUserName(e.target.value)}
          />
          <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
          <TextField
            margin="dense"
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input2}</p>
          <SoftBox mb={1} ml={0.5}>
            {invalid && <p style={{ color: "red" }}>{invalid}</p>}
          </SoftBox>
          <TextField
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone number"
            type="text"
            fullWidth
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input3}</p>
          <TextField
            margin="dense"
            id="password"
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  style={{
                    position: "relative",
                    left: "91px",
                    bottom: "1px",
                    fontSize: "larger",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? (
                    <VisibilityOff onClick={toggleEye} />
                  ) : (
                    <Visibility onClick={toggleEye} />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input4}</p>
          <SoftBox>
            <SoftInput
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input5}</p>
          </SoftBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}
export default Tables;
