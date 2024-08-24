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

// @mui material components

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Height, ZoomIn, ZoomOut } from "@mui/icons-material";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Switch from "@mui/material";

// Data

import { useEffect, useState } from "react";
import { Zoom } from "@mui/material";
import axios from "axios";
import trainers from "layouts/Trainers/data/authorsTableData";
// import { Navigate, useNavigate } from "react-router-dom";

function Tables() {
  // const navigate = useNavigate();
  const [plantype,setplantypes] = useState("");

  const { columns, rows } = trainers({plantype});

  const [invalid, setinvalid] = useState("");

  const [open, setopen] = useState(false);
  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [email, Setemail] = useState("");
  const [contact, Setcontact] = useState("");
  const [description, setdescription] = useState("");
  const [status, Setstatus] = useState("Active");
  const [types, settypes] = useState("");
  const [image, setImage] = useState([]);

  const [err1, seterr1] = useState("");
  const [err2, seterr2] = useState("");
  const [err3, seterr3] = useState("");
  const [err4, seterr4] = useState("");
  const [err5, seterr5] = useState("");
  const [err6, seterr6] = useState("");

  // const [workout,Setworkout] = useState("")
  // const [diet,Setdiet] = useState("")

  const [type, settype] = useState([]);
  useEffect(() => {
    typeofplan();
  }, []);

  const typeofplan = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get("http://localhost:2000/adminroute/plantypeGet");
      settype(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlesave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("type", types);

    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

  

    axios
      .post("http://localhost:2000/adminroute/trainerspost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        handleClose();
        setinvalid("");
        window.location.href = "/Trianers";
      })
      .catch((error) => {
        console.log("error posting data", error);
        if (error.response && error.response.status === 400) {
          setinvalid("email is already exist");
        }
      });

    if (image == "") {
      seterr1("Upload a image");
    } else {
      seterr1("");
    }
    if (firstname == "") {
      seterr2("Enter your first name");
    } else {
      seterr2("");
    }
    if (!lastname.trim()) {
      seterr3("Enter your last name");
    } else {
      seterr3("");
    }
    if (!email.trim()) {
      seterr4("Enter your email");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      seterr4("Email is not valid");
    } else {
      seterr4("");
    }

    if (!contact.trim()) {
      seterr5("Enter your contact number");
    } else if (!/^\d{10}$/.test(contact)) {
      seterr5("Phone Number is not valid");
    } else {
      seterr5("");
    }
    if (!description) {
      seterr6("Enter your description");
    } else {
      seterr6("");
    }
  };

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
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
              <SoftTypography variant="h6">{"Trainer's"}</SoftTypography>
              <select id="dropdown-basic-button" title="Type" onChange={(e)=>setplantypes(e.target.value)}  >
              <option value={""}>
                    All
                  </option>
                {type.map((item,index) => (
                  <>
                  <option value={item._id} key={index}>
                    {item.type}
                  </option>
                  </>
                ))}
              </select>
              <Button variant="contained" onClick={handleOpen}>
                Add Trainer
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
              <Table columns={columns} rows={rows} plantype={plantype} />
            </SoftBox>
          </Card>
        </SoftBox>

        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Zoom}
          transitionDuration={380}
          keepMounted
          PaperProps={{ style: dialogStyle }}
        >
          <DialogTitle>Trainers</DialogTitle>
          <DialogContent>
            <input
              multiple
              accept="image/*"
              type="file"
              onChange={(e) => setImage(e.target.files)}
            />
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err1}</p>
            <TextField
              margin="dense"
              id="fisrtname"
              name="fisrtname"
              placeholder="Fisrtname"
              type="text"
              fullWidth
              onChange={(e) => Setfirstname(e.target.value)}
            ></TextField>
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err2}</p>
            <TextField
              margin="dense"
              id="lastname"
              name="lastname"
              placeholder="Lastname"
              type="text"
              fullWidth
              onChange={(e) => Setlastname(e.target.value)}
            ></TextField>
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err3}</p>
            <TextField
              margin="dense"
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              fullWidth
              onChange={(e) => Setemail(e.target.value)}
            ></TextField>
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err4}</p>
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{invalid}</p>
            <TextField
              margin="dense"
              id="contactInfo"
              name="contactInfo"
              placeholder="contactInfo"
              type="tel"
              fullWidth
              onChange={(e) => Setcontact(e.target.value)}
            ></TextField>
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err5}</p>
            <textarea
              style={{
                width: "100%",
                borderRadius: "7px",
                fontSize: "14px",
                paddingLeft: "4px",
                outline: "none",
              }}
              id="Description"
              name="Description"
              placeholder="Description"
              type="text"
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{err6}</p>
            <SoftBox>
              <select name="type" onChange={(e) => settypes(e.target.value)}>
                {type.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.type}
                  </option>
                ))}
              </select>
            </SoftBox>
            <select name="status" id="Active-Deactive" onChange={(e) => Setstatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={handlesave}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
