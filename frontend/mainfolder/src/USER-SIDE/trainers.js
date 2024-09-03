import "../assets/usercss/user-profile.css"
import React from "react";
import Navbar from "./navbar";
import bannert from "../assets/img/hero-bg.jpg";
import Footer from "./footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Col, Row } from "react-bootstrap";
function trainers() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [list, setList] = useState([]);
  const [profile, setProfile] = useState([]);
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    getdata();
    getProfile();
    ChekingActiveAndExpired();
  }, []);
  const getProfile = () => {
    const getDetails = JSON.parse(localStorage.getItem("appliedPackage")) || {};
    setProfile(getDetails);
    if (Object.keys(getDetails).length > 0) {
      setShow(true);
      setHide(false);
    } else {
      setHide(true);
      setShow(false);
    }
  };
  const ChekingActiveAndExpired = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/foractiveorexpired`);
      if (response.data.status === "active" && Object.keys(profile).length > 0) {
        setShow(true);
        setHide(false);
      } else if (response.data.status === "expired" && Object.keys(profile).length < 1) {
        setShow(false);
        setHide(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getdata = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/trainersget`);
      setList(response.data);
    } catch (err) {
      console.log(err, "error getting trainers");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${bannert})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2 style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'}}>Our trainers</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {show && (
        <section className="trainer-section about-trainer spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2 style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'}}>TRAINERS</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {list.map((item) => (
                <div className="col-lg-4 col-md-6" key={item._id}>
                  <div className="single-trainer-item my-20">
                    <img
                      style={{ height: "35rem" }}
                      src={`${BaseUrl}/${item.image[0]}`}
                      alt="No Image"
                    />
                    <div className="trainer-text">
                      <h5>{item.firstname}</h5>
                      <span>{item.description}</span>
                      <br />
                      <Button
                        className="primary-btn signup-btn"
                        variant="contained"
                        component={Link}
                        to={`/trainersprofile/${item._id}`}
                      >
                        {" "}
                        view
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {hide && (
        <section className="trainer-section about-trainer spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2>TRAINERS</h2>
                </div>
              </div>
            </div>
            <Row className="row">
              {list.slice(0, 3).map((item) => (
                <div className="col-md-6 col-lg-4"  key={item._id}>
                  <div className="single-trainer-item my-20">
                    <img
                      style={{ height: "35rem" }}
                      src={`${BaseUrl}/${item.image[0]}`}
                      alt="No Image"
                    />
                    <div className="trainer-text">
                      <h5>{item.firstname}</h5>
                      <span>{item.description}</span>
                      <br />
                      <Button
                        className="primary-btn signup-btn"
                        component={Link}
                        to={"/subscribe"}
                        variant="contained"
                      >
                        View more
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Row>        
          </div>
        </section>
      )}
      <Footer />
    </div>
  ); 
}

export default trainers;
