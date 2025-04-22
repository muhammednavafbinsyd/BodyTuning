/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SoftButton from "components/SoftButton";
import Modal from "react-bootstrap/Modal";
function authorsTableData(){
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [list, setlist] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  useEffect(() => {
    const getGallery = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/galleryGet`);
        setlist(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGallery();
  }, []);
  const Image = ({ image }) => (
    <SoftBox display="flex" flexDirection="column">
      <img src={image} fontWeight="medium" color="text" height="50px" width="50px"></img>
    </SoftBox>
  );
  const Category = ({ category }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {category}
      </SoftTypography>
    </SoftBox>
  );
  const deletegallery = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/adminroute/deletegallery/${id}`);
      getGallery();
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
  return {
    columns: [
      { name: "image", align: "center" },
      { name: "category", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: list.map((item) => ({
      image: <Image image={`${BaseUrl}/uploads/${item.image}`} />,
      category: <Category category={item.category} />,
      action: (
        <div>
          <SoftButton
            color="warning"
            fontWeight="medium"
            variant="text"
            component={Link}
            to={`/galleryEdit/${item._id}`}
          >
            Edit
          </SoftButton>
          <SoftButton
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
              <SoftButton variant="text" color="error" onClick={() => deletegallery(item._id)}>
                Ok
              </SoftButton>
            </Modal.Footer>
          </Modal>
        </div>
      ),
    })),
  };
}
export default authorsTableData;
