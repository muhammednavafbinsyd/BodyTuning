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
import TestimonialTableData from "layouts/testimonial-management/data/testimonialtable";
import axios from "axios";
import { Fade, Grow, Slide, Zoom } from "@mui/material";
import SoftInput from "components/SoftInput";
function Tables () {
const BaseUrl = process.env.REACT_APP_BASE_URL;  
const { columns, rows } = TestimonialTableData();
const [ title, setTitle] =useState("")
const [description,setDescription] = useState("")
const [ image,setImage] = useState(null)
const [open,setOpen] = useState(false)
const [error1 ,setError1]= useState("")
const [error2 ,setError2]= useState("")
const [error3 ,setError3]= useState("")
const handleOpen = () => {
    setOpen(true)
}
const handleClose = () =>{
    setOpen(false)
    setError1(null);
    setError2(null);
    setError3(null);
}
const dialogStyle = {
    borderRadius: "10px",
  };
const handleSubmit = (e) =>{
    e.preventDefault();
    const validationErrors = [];
   if (!image){
    setError1("image required")
    validationErrors.push("image required")
   }else{
    setError1(null)
   }
   if(!title){
    setError2("Title required")
    validationErrors.push("title required")
   }else{
    setError2(null)
   }
if(!description){
    setError3("Description required")
    validationErrors.push("description required")
}else{
    setError3(null)
}
if(validationErrors.length === 0 ){
const data ={
    image:image,
    title:title,
    description:description
}
axios.post(`${BaseUrl}/adminroute/testimonialPost`,data,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
})
.then((response)=>{
    if(response.status === 200){
    handleClose()
    window.location.href ="/testimonial"
    }else{
        alert("somthing went wrong")
    }
})
.catch((error)=>{
    console.log(error,"an error testimonialPost")
})
}
}
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Testimonials</SoftTypography>
              <Button variant="contained" onClick={handleOpen}>
                Add Testimonial
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
        <DialogTitle>Testimonials</DialogTitle>
        <DialogContent>
          <SoftBox>
            <SoftInput
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <p style={{ fontSize: "10px", color: "red" }}>{error1}</p>
          </SoftBox>
          <TextField
            margin="dense"
            id="title"
            name="title"
            placeholder="Title"
            type="text"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
          <p style={{ fontSize: "10px", color: "red" }}>{error2}</p>
          <SoftBox>
            <textarea
              style={{
                width: "100%",
                borderRadius: "7px",
                fontSize: "14px",
                paddingLeft: "4px",
                outline: "none",
              }}
              name="description"
              placeholder="Description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p style={{ fontSize: "10px", color: "red" }}>{error3}</p>
          </SoftBox>
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
  )
}
export default Tables;