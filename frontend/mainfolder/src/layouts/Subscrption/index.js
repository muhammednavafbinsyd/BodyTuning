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
import projectsTableData from "layouts/Subscrption/data/projectsTableData";
import { useState } from "react";
import { Zoom } from "@mui/material";
import axios from "axios";
import colors from "assets/theme/base/colors";

function Tables() {
  const { columns, rows } = projectsTableData();

  // subscription state
  const [membershiptype, setMembershiptype] = useState("");
  const [duration, setDuration] = useState("");
  const [monthlyfee, setMonthlyFee] = useState("");
  const [onetimeentrollmentfee, setOnetimeEntrollmentFee] = useState("");
  const [additionalbenefits, setAdditionalbenefits] = useState("");
  // validation state
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");

  //
  const [openplanDialog, setopenplanDialog] = useState(false);

  const handleplanbox = () => {
    setopenplanDialog(true);
  };
  const handlecloseDialog = () => {
    setopenplanDialog(false);
  };

  const dialogStyle = {
    borderRadius: "10px",
  };

  const submit = (e) => {
    e.preventDefault();
    const subdata = {
      membershiptype: membershiptype,
      duration: duration,
      monthlyfee: monthlyfee,
      onetimeentrollmentfee: onetimeentrollmentfee,
      additionalbenefits: additionalbenefits,
    };
    axios
      .post("http://localhost:2000/adminroute/subscriptioncreate", subdata)
      .then((response) => {
        handlecloseDialog();
        window.location.href = "/subscription";
      })
      .catch((error) => {
        console.log("error posting data", error);
        window.location.href =("/authentication/sign-in")
      });

    if (membershiptype.length < 1) {
      setInput1("Enter a membership type");
    } else {
      setInput1(null);
    }
    if (duration.length < 1) {
      setInput2("Enter a duration");
    } else {
      setInput2(null);
    }
    if (monthlyfee.length < 1) {
      setInput3("Enter a monthly fee");
    } else {
      setInput3(null);
    }
    if(onetimeentrollmentfee.length<1){
      setInput4("Enter  a onetime enrollment fee");
    }else{
      setInput4(null);
    }
    if(additionalbenefits.length<1){
      setInput5("Enter a additionalbenefits");
    }else{
      setInput5(null);
    }

  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Subscription</SoftTypography>
              <Button onClick={handleplanbox} variant="contained">
                ADD PLAN
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
      <SoftBox>
        <Dialog
          open={openplanDialog}
          close={handlecloseDialog}
          TransitionComponent={Zoom}
          transitionDuration={380}
          keepMounted
          PaperProps={{ style: dialogStyle }}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Subscription Form</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="membershiptype"
              placeholder="Membership Type"
              type="text"
              fullWidth
              // maxWidth="md"
              onChange={(e) => setMembershiptype(e.target.value)}
            />
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input1}</p>
            <TextField
              margin="dense"
              name="duration"
              placeholder="Duration"
              type="text"
              fullWidth
              onChange={(e) => setDuration(e.target.value)}
            />
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input2}</p>
            <TextField
              margin="dense"
              name="monthlyfee"
              placeholder="Monthly Fee"
              type="text"
              fullWidth
              onChange={(e) => setMonthlyFee(e.target.value)}
            />
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input3}</p>
            <TextField
              margin="dense"
              name="onetimeentrollmentfee"
              placeholder="One-Time Enrollment Fee"
              type="text"
              fullWidth
              onChange={(e) => setOnetimeEntrollmentFee(e.target.value)}
            />
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input4}</p>
            <TextField
              margin="dense"
              name="additionalbenefits"
              placeholder="Additional Benefits "
              type="text"
              fullWidth
              onChange={(e) => setAdditionalbenefits(e.target.value)}
            />
            <p style={{ fontSize: "10px", marginLeft: "1rem", color: "red" }}>{input5}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlecloseDialog}>cancel</Button>
            <Button onClick={submit}>add</Button>
          </DialogActions>
        </Dialog>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
