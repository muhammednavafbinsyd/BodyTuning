import React from "react";
import Navbar from "./Navbar";
import bannerimg6 from "../assets/img/hero-bg.jpg";
import Footer from "./footer";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function Workoutplan(){
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [list, Setlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [types, settypes] = useState([]);
  const [hide, sethide] = useState(false);
  const [show, setshow] = useState(true);
  const [profile, setprofile] = useState();
  useEffect(() => {
    planTypeList();
    getProfile();
  }, []);
  const getProfile = () => {
    const getDetails = JSON.parse(localStorage.getItem("appliedPackage")) || {};
    setprofile(getDetails);
    if (Object.keys(getDetails).length > 0) {
      setshow(true);
    } else {
      setshow(true);
    }
  };
  const planTypeList = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/plantypes`);
      settypes(response.data);
    } catch (err) {
      console.log(err);
      if (!localStorage.getItem("token")) {
        window.location.href = "/";
      }
    }
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Navbar />
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage: `url(${bannerimg6})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>workout </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {show && (
        <section className="trainer-section about-trainer spad">
          <div className="container">
            <div className="row">
              {types.map((item, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <Card style={{ height: "70%", width: "70%" }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        {item.type}
                      </Typography>
                      <CardActions>
                         {profile && Object.keys(profile).length > 0 ? (
                            <Button size="small" component={Link} to={`/workoutview/${item._id}`}>
                              View
                            </Button>
                          ) : (
                            <Button onClick={handleClickOpen}>View</Button>
                          )}
                      </CardActions>
                    </CardContent>
                  </Card>
                </div>
              ))}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Alert"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                   You have no active subscription package 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>cancel</Button>
                  <Button onClick={handleClose} component={Link} to={"/subscribe"} autoFocus>
                    subscribe now
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
export default Workoutplan;
