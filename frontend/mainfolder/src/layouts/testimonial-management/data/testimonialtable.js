/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
function Data() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [list, setList] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  useEffect(() => {
    const testimonialList = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/testimonialList`);
        setList(response.data);
      } catch (err) {
        console.log(err);
        if (!localStorage.getItem("token")) {
          window.location.href = "/";
        }
      }
    };
    testimonialList();
  }, []);
  const remove = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/adminroute/deleteTestimonials/${id}`);
      testimonialList();
      closeDeleteDialog();
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
  const Image = ({ image }) => (
    <SoftBox display="flex" flexDirection="column">
      <img src={image} fontWeight="medium" color="text" height="50px" width="50px"></img>
    </SoftBox>
  );
  const Title = ({ title }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {title}
      </SoftTypography>
    </SoftBox>
  );
  const Description = ({ description }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text" style={{width:"30rem"}} >
        {description}
      </SoftTypography>
    </SoftBox>
  );
  return {
    columns: [
      { name: "image", align: "center" },
      { name: "title", align: "center" },
      { name: "description", align: "center" },
      { name: "actions", align: "center" },
    ],
    rows: list.map((item) => ({
      image: <Image image={`${BaseUrl}/uploads/${item.image}`} />,
      title: <Title title={item.title} />,
      description: <Description description={item.description} />,
      actions: (
        <div>
          <SoftButton
            color="warning"
            fontWeight="medium"
            variant="text"
            component={Link}
            to={`/editTestimonial/${item._id}`}
          >
            Edit
          </SoftButton>
          &nbsp;
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
              <Modal.Title style={{ fontSize: "18px" }}>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "15px" }}>
              Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
              <SoftButton variant="text" color="secondary" onClick={closeDeleteDialog}>
                Cancel
              </SoftButton>
              <SoftButton variant="text" color="error" onClick={() => remove(item._id)}>
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
