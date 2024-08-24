/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
function Data() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [List, setList] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/userget`);
        setList(response.data);
      } catch (err) {
        if(!localStorage.getItem("token")){
          window.location.replace('/')
        }
        console.log(err);
      }
    };
    fetchUser();
  }, []);
  const remove = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/adminroute/userdelete/${id}`);
      closeDeleteDialog();
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };
  const openDeleteDialog = (id) => {
    setDeleteItemId(id);
    setShowDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
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
  const Email = ({ email }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {email}
      </SoftTypography>
    </SoftBox>
  );
  const Phone = ({ phone }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {phone}
      </SoftTypography>
    </SoftBox>
  );
  return {
    columns: [
      { name: "name", align: "left" },
      { name: "email", align: "left" },
      { name: "phone", align: "center" },
      { name: "edit", align: "center" },
      { name: "delete", align: "center" },
    ],
    rows: List.map((item) => ({
      name: <Author image={`${BaseUrl}/${item.image}`} name={item.userName} />,
      email: <Email email={item.email} />,
      phone: <Phone phone={item.phoneNumber} />,
      edit: (
        <SoftButton
          color="warning"
          fontWeight="medium"
          variant="text"
          component={Link}
          to={`/editUsers/${item._id}`}
        >
          Edit
        </SoftButton>
      ),
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
    })),
  };
}
export default Data;
