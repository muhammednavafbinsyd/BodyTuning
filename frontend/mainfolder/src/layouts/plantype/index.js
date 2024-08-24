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
import TestimonialTableData from "layouts/plantype/data/plantypetable";
import axios from "axios";
import { Fade, Grow, Slide, Zoom } from "@mui/material";
function Tables() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const { columns, rows } = TestimonialTableData();
  const [open, setOpen] = useState();
  const [type, settype] = useState("");
  const [error1, setError1] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError1(null);
  };
  const dialogStyle = {
    borderRadius: "10px",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];
    if (!type) {
      setError1("type required");
      validationErrors.push("type required");
    } else {
      setError1(null);
    }
    if (validationErrors.length === 0) {
      const data = {
        type: type,
      };
      axios
        .post(`${BaseUrl}/adminroute/plantypePost`, data)
        .then((response) => {
          if (response.status === 200) {
            handleClose();
            window.location.href ="/plantype"
          } else {
            alert("somthing went wrong");
          }
        })
        .catch((error) => {
          console.log(error, "an error plantypePost");
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
              <SoftTypography variant="h6">PLAN TYPE</SoftTypography>
              <Button variant="contained" onClick={handleOpen}>
                Add Plantype
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
        <DialogTitle>Plan type</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="plantype"
            name="plantype"
            placeholder="plantype"
            type="text"
            fullWidth
            onChange={(e) => settype(e.target.value)}
          />
          <p style={{ fontSize: "10px", color: "red" }}>{error1}</p>
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
