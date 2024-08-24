import React from "react";
import Navbar from "./Navbar";
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
  const [cheking, setCheking] = useState([]);
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
      setCheking(response.data.data);
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
  const stylerow = {
    marginTop: "10%",
  };
  return (
    <div>
      <Navbar />
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${bannert})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Our trainers</h2>
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
                  <h2>TRAINERS</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {list.map((item) => (
                <div className="col-lg-4 col-md-6  " style={stylerow} key={item._id}>
                  <div className="single-trainer-item">
                    <img
                      style={{ height: "35rem" }}
                      src={`${BaseUrl}/${item.image[1]}`}
                      alt
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
                <div className="col-lg-4 col-md-6 m-7" key={item._id}>
                  <div className="single-trainer-item">
                    <img
                      style={{ height: "35rem" }}
                      src={`${BaseUrl}/${item.image[1]}`}
                      alt
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
              <div className="col-sm-9 col-md-9 col-lg-8">
                <h3 style={{ position: "relative", left: "20rem", top: "8rem"}}>
                  Subscribe for view more trainers
                </h3>
              </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}

export default trainers;
