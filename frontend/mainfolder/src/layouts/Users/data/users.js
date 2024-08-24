/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
function  UserData() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [List, setList] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  useEffect(() => {
    const getusers = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/userroute/getUsers`);
        setList(response.data.getUsers);
      } catch (err) {
        console.log("Error getting subscription", err);
        if (!localStorage.getItem("token")) {
          window.location.replace("/");
        }
      }
    };
    getusers();
  }, []);
  const openDeleteDialog = (id) => {
    setDeleteItemId(id);
    setShowDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
const remove = async (id) => {
  try{
    await axios.delete(`${BaseUrl}/userroute/userdeletion/${id}`);
    closeDeleteDialog();
    getusers();
  }catch (error) {
    console.log(error);
  }
}
  const Username = ({ image,username}) => (
    <SoftBox display="flex"  alignItems="center"  px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={username} size="sm" variant="rounded" />
      </SoftBox>
     <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {username}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
  const Email = ({ email }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {email}
      </SoftTypography>
    </SoftBox>
  );
  const Phonenumber = ({ phonenumber }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {phonenumber}
      </SoftTypography>
    </SoftBox>
  );
  const Location = ({ location }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {location}
      </SoftTypography>
    </SoftBox>
  );
  return {  
    columns: [
      { name: "username", align: "left"},
      { name: "email", align: "left"},
      { name: "phonenumber", align: "center"},
      { name: "location", align: "center" },
      {name:"delete",align: "center"},
    ],
    rows: List.map((item) => ({
      username: <Username image={`${BaseUrl}/${item.images}`} username={item.username}/>,
      email: <Email email={item.email} />,
      phonenumber: <Phonenumber phonenumber={item.phonenumber} />,
      location: <Location location={item.location} />,     
      delete: (
        <div className="modelbox">
          <SoftButton
            component="a"
            href="#"
            variant="text"
            color="error"
            fontWeight="medium"
            onClick={() => openDeleteDialog(item._id)}
          >
            delete
          </SoftButton>
          <Modal show={showDeleteDialog && deleteItemId === item._id} onHide={closeDeleteDialog}>
            <Modal.Header closeButton>
              <Modal.Title style={{fontSize:"18px"}}>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body style= {{fontSize:"15px"}} >Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
              <SoftButton variant="text" color="secondary" onClick={closeDeleteDialog}>
                Cancel
              </SoftButton>
              <SoftButton  variant="text"  color="error" onClick={() => remove(item._id)}>
                Ok
              </SoftButton>
            </Modal.Footer>
          </Modal>
        </div>
      ),
    }))
  };
  }
export default UserData;