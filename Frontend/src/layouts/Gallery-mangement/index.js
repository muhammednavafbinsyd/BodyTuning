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
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
// Data
import authorsTableData from "layouts/Gallery-mangement/data/galleryTable";
import SoftButton from "components/SoftButton";
import { useState } from "react";
import { Zoom } from "@mui/material";
import axios from "axios";
function Tables() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const { columns, rows } = authorsTableData();
  const [open, setOpen] = useState(false);
  const [image, setimage] = useState(null);
  const [category, setcategory] = useState("");
  const [error1, setError1] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dialogStyle = {
    borderRadius: "10px",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];
    if (!image) {
      setError1("image is required");
      validationErrors.push("image is required");
    } else {
      setError1(null);
    }
    if (validationErrors.length === 0) {
      const data = new FormData();
      data.append("image", image);
      data.append("category", category);
      axios
        .post(`${BaseUrl}/adminroute/galleryPost`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          handleClose();
         window.location ="/gallery2"
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">{"Gallery"}</SoftTypography>
              <Button variant="contained" onClick={handleOpen}>
                Add{" "}
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
        <DialogTitle>Gallery</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="plantype"
            name="plantype"
            placeholder="plantype"
            type="file"
            fullWidth
            onChange={(e) => setimage(e.target.files[0])}
          />
          <p style={{ fontSize: "10px", color: "red" }}>{error1}</p>
          <select onChange={(e) => setcategory(e.target.value)}>
            <option>Fitness</option>
            <option>Coaching</option>
            <option>Event</option>
            <option>Others</option>
          </select>
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
