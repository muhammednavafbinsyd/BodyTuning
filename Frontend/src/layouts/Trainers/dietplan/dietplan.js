/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Modal from "react-bootstrap/Modal";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Zoom } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
function Dietplan() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [list, Setlist] = useState([]);
  const { id } = useParams();
  const [ types, setTypes ] = useState([]);
  const navigate = useNavigate("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [openid, setOpenId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const openDeleteDialog = (id) => {
    setDeleteItemId(id);
    setShowDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  useEffect(() => {
    const getplan = async (id) => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`${BaseUrl}/adminroute/dietplanget/${id}`);
        const data = await response.data;
        if (Array.isArray(data)) {
          Setlist(data);
        } else {
          Setlist([data]);
        }
      } catch (error) {
        console.log(error, "get data err plan");
      }
    }
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
    getplan(id);
    gettype();
  }, [id]);
  function removeHTMLTags(html) {
    return html.replace(/<[^>]*>/g, "");
  }
  const handleDelete = async (itemid, id) => {
    try {
      await axios.delete(`${BaseUrl}/adminroute/deletedietplan/${itemid}`);
      getplan();
    
    } catch (error) {
      console.log(error, "delete data plan");
    } finally {
      closeDeleteDialog();
      window.location.href = `/dietplan/${id}`; 
    }
  };
  const Title = ({ title }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {title}
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
  const handleOpenDialog = (id) => {
    setOpenDialog(true)
    setOpenId(id);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const dialogStyle = {
    borderRadius: "10px",
  };
  const handledit = (eid) => {
    try {
      const state = {
        id,
        eid,
      };
      navigate(`/editdietplan/${id}/${eid}`,{ state });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    columns: [
      { name: "title", align: "center" },
      {name:"type",align:"center"},
      { name: "actions", align: "center" },
    ],
    rows: list
      .filter((item) => item !== null)
      .map((item) => ({
        title: <Title title={removeHTMLTags(item.title)} />,
        type:<Type type={types.find(typename => typename._id === item.type)?. type}></Type>,
        actions: (
          <div >
            <Button onClick={() => handleOpenDialog(item._id)}>View</Button>
            <Button onClick={() => handledit(item._id)}>edit</Button>
            <Button onClick={() => openDeleteDialog(item._id)}>delete</Button>
            <Dialog
              open={openDialog && openid === item._id}
              onClose={closeDeleteDialog}
              TransitionComponent={Zoom}
              transitionDuration={380}
              keepMounted
              PaperProps={{ style: dialogStyle }}
              fullWidth
              maxWidth="lg"
            >
              <DialogTitle>Week plan</DialogTitle>
              <DialogContent>
                <SoftBox>
               <div dangerouslySetInnerHTML={{ __html: item.title }} />
               </SoftBox>
              
                <softBox >
                <label>DAY1</label>
                <div 
                  dangerouslySetInnerHTML={{
                    __html: item.day1
                
                  }}
                />
                </softBox>
              <SoftBox >
              <label>DAY2</label>
                <div 
                  dangerouslySetInnerHTML={{
                    __html: item.day2
                  }}
                />
                 </SoftBox>              
                 <SoftBox>
                 <label>DAY3</label>
                <div 
                  dangerouslySetInnerHTML={{
                    __html: item.day3
                  }}
                />
                </SoftBox>
                <softBox  >
                <label>DAY4</label>
                <div 
                  dangerouslySetInnerHTML={{
                    __html: item.day4
                  }}
                />
                </softBox>
                <softBox>
                <label>DAY5</label>
               <div 
                  dangerouslySetInnerHTML={{
                    __html: item.day5
                  }}
                />
                </softBox>
                <SoftBox >
                <label>DAY6</label>
               <div 
                  dangerouslySetInnerHTML={{
                    __html: item.day6
                  }}
                />
                </SoftBox>
                <label>DAY7</label>
                <SoftBox >
                <div 
                  dangerouslySetInnerHTML={{
                    __html: item.day7
                  }}
                />
                </SoftBox>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
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
                <SoftButton
                  variant="text"
                  color="error"
                  onClick={() => handleDelete(item._id, item.trainerId)}
                >
                  Ok
                </SoftButton>
              </Modal.Footer>
            </Modal>
          </div>
        ),
      })),
  };
}
export default Dietplan;
