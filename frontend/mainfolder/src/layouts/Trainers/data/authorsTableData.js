/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Switch } from "@mui/material";
function Trainers({ plantype }) {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedPlantypes, setSelectedPlantypes] = useState('');
// plantypes: selectedPlantypes
  const [list, setList] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const openDeleteDialog = (id) => {
    setDeleteItemId(id);
    setShowDeleteDialog(true);
  };
  const closeDeleteDialog = () =>{
    setShowDeleteDialog(false);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/adminroute/trainersdelete/${id}`);
      closeDeleteDialog();
      window.location.href = "/Trianers";
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getdata = async (plantypes) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/trainersget?plantypes=${plantype}`);
        setList(response.data);
      } catch (err) {
        console.log(err, "error getting trainers");
      }
    };
    getdata(plantype);
    const gettype = async()=>{
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try{
        const response = await axios.get(`${BaseUrl}/adminroute/plantypeGet`)
        setTypes(response.data);
      }catch(err){
        console.log(err);
      }
    }
    gettype();
  },[plantype]);
  // status...........
  const toggleStatus = async (id) => {
    try {
      const updatedData = list.map((item) => {
        if (item._id === id) {
          return { ...item, status: item.status === "Active" ? "Deactive" : "Active" };
        }
        return item;
      });
      setList(updatedData);
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      await axios.put(`${BaseUrl}/adminroute/updateStatus/${id}`, {
        status: updatedData.find((item) => item._id === id).status,
      });
    } catch (error) {
      console.error(error);
      const previousStatus = updatedData.find((item) => item._id === id).status === "Active" ? "Deactive" : "Active";
      const revertedData = list.map((item) =>
        item._id === id ? { ...item, status: previousStatus } : item
      );
      setList(revertedData);
    }
  };
  const Author = ({ image, name }) => (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
  const Emailinfo = ({ email, contact }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {email}
      </SoftTypography>
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {contact}
      </SoftTypography>
    </SoftBox>
  );
  const Description = ({ description }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text" style={{width:"28rem"}} >
        {description}
      </SoftTypography>
    </SoftBox>
  );
  const Type = ({ type }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text" style={{width:"3rem"}} >
        {type}
      </SoftTypography>
    </SoftBox>
  );
  return {
    columns: [
      { name: "name", align: "left" },
      { name: "email&contact", align: "left" },
      { name: "description", align: "center" },
      { name: "status", align: "center" },
      {name:"type",align:"center"},
      { name: "actions", align: "center" },
    ],
    rows: list.map((item) => ({
      name: <Author image={`${BaseUrl}/${item.image[0]}`} name={item.firstname} />,
      "email&contact": <Emailinfo email={item.email} contact={item.contact} />,
      description: <Description  description={item.description} />,
      type:<Type type={types.find(typename => typename._id === item.type)?. type}></Type>,
      status: (
        <div>
          <Switch checked={item.status === "Active"} onChange={() => toggleStatus(item._id)} />
        </div>
      ),
      actions: (
        <div  >
          <SoftButton
            color="primary"
            fontWeight="medium"
            variant="text "
            component={Link}
            to={`/workoutplan/${item._id}`}
          >
            workout plan
          </SoftButton>
          <SoftButton
            color="secondary"
            fontWeight="medium"
            variant="text"
            component={Link}
            to={`/dietplan/${item._id}`}
          >
            diet plan
          </SoftButton>
          <SoftButton
            color="grey"
            fontWeight="medium"
            variant="text"
            component={Link}
            to={`/trainersEdit/${item._id}`}
          >
            edit
          </SoftButton>
          <SoftButton
            color="error"
            fontWeight="medium"
            variant="text"
            onClick={() => openDeleteDialog(item._id)}
          >
            delete
          </SoftButton>

          <Modal show={showDeleteDialog && deleteItemId === item._id} onHide={closeDeleteDialog}>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: "18px" }}>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "15px" }}>
              Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
              <SoftButton variant="text" color="secondary" onClick={closeDeleteDialog}>
                Cancel
              </SoftButton>
              <SoftButton variant="text" color="error" onClick={() => handleDelete(item._id)}>
                Ok
              </SoftButton>
            </Modal.Footer>
          </Modal>
        </div>
      ),
    })),
  };
}
export default Trainers;
