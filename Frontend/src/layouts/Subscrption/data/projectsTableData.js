/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Zoom} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContentText  from "@mui/material/DialogContentText";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
// Images
import { useEffect, useState } from "react";
import axios from "axios";
import SoftButton from "components/SoftButton";
function ProjectsTableData() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [List, setList] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const openDeleteDialog = (id) => {
    setDeleteItemId(id);
    setShowDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  useEffect(() => {
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/getSubscription`);
        setList(response.data);
      } catch (err) {
        console.log("Error getting subscription", err);
        if(!localStorage.getItem('token')){
          window.location.replace('/')
        }
        
      }
    };
    fetchdata();
  }, []);
  const remove = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/adminroute/Deletesubscription/${id}`);
      closeDeleteDialog();
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  };
  const MembershipType = ({ membershiptype }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {membershiptype}
      </SoftTypography>
    </SoftBox>
  );
  const Duration = ({ duration }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {duration}
      </SoftTypography>
    </SoftBox>
  );
  const Monthlyfee = ({ monthlyfee }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {monthlyfee}
      </SoftTypography>
    </SoftBox>
  );
  const OneTimeEnrollmentFee = ({ onetimeentrollmentfee }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {onetimeentrollmentfee}
      </SoftTypography>
    </SoftBox>
  );
  const AdditionalBenefits = ({ additionalbenefits }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {additionalbenefits}
      </SoftTypography>
    </SoftBox>
  );
  return {
    columns: [
      { name: "Membership Type", align: "center" },
      { name: "Duration",  align: "center" },
      { name: "Monthly Fee",  align: "center" },
      { name: "One-Time Enrollment Fee", align: "center" },
      { name: "Additional Benefits", align: "center" },
      { name: "Edit",  align: "center" },
      { name: "Delete", align: "center" },
    ],
    rows: List.map((item) => ({
      'Membership Type': <MembershipType membershiptype={item.membershiptype}/>,
      "Duration": <Duration duration={item.duration}/>,
      'Monthly Fee': <Monthlyfee monthlyfee={item.monthlyfee}/>,
      'One-Time Enrollment Fee': (
        <OneTimeEnrollmentFee onetimeentrollmentfee={item.onetimeentrollmentfee}/>
      ),
      'Additional Benefits': (
        <AdditionalBenefits additionalbenefits={item.additionalbenefits}/>
      ),
      "Edit":(      
        <SoftButton  variant="text" color="warning" fontWeight="medium" component={Link} to ={`/subsEdit/${item._id}`}    >
          
          edit
        </SoftButton>  
      ),
      "Delete": (
        <div>
        <SoftButton  variant="text" color="error" fontWeight="medium"  onClick={() => openDeleteDialog(item._id)}>
          delete
        </SoftButton>
  
         <Modal show={showDeleteDialog && deleteItemId === item._id} onHide={closeDeleteDialog}>
            <Modal.Header closeButton>
              <Modal.Title style={{fontSize:"18px"}} >Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize:"15px"}}>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
              <SoftButton    variant="text" color="secondary" onClick={closeDeleteDialog}>
                Cancel
              </SoftButton>
              <SoftButton   variant="text"  color="error"  onClick={() => remove(item._id)}>
                Ok
              </SoftButton>
            </Modal.Footer>
          </Modal>
    </div>
      ),
    })),
  };
}
export default ProjectsTableData;
