import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import BannerImg from "../assets/img/hero-bg.jpg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import "../assets/usercss/style.css";
import { useParams, useNavigate } from "react-router-dom";
import { Col, NavItem } from "react-bootstrap";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
function Trainersprofile() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setprofile] = useState();
  const [list, Setlist] = useState([]);
  const [list2, Setlist2] = useState([]);
  const [data, setdata] = useState({
    image: [],
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    trainerId: "",
  });
  useEffect(() => {
    getprofile(id);
    getuserpackage();
    getplan(id);
    getplan2(id);
  }, [id]);
  const getprofile = async (id) => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/tarinersedit/${id}`);
      setdata(response.data);
    } catch (err) {
      console.log(err, "cannot get ");
    }
  };
  const getplan = async (id) => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/trainerworkoutplan/${id}`);
      const data = await response.data;

      if (Array.isArray(data)) {
        Setlist(data);
      } else {
        Setlist([data]);
      }
    } catch (error) {
      console.log(error, "get data err plan");
    }
  };
  const getplan2 = async (id) => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/trainerdietplan/${id}`);
      const data = await response.data;
      if (Array.isArray(data)) {
        Setlist2(data);
      } else {
        Setlist2([data]);
      }
    } catch (error) {
      console.log(error, "get data err plan");
    }
  };
  const getuserpackage = () => {
    const getDetails = JSON.parse(localStorage.getItem("appliedPackage")) || {};
    setprofile(getDetails);
  };
  return (
    <div>
      <Navbar/>
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Profile</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trainer-section about-trainer spad ">
        <div className="container">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="profile" title="Profile">
              <div className="pro-file">
                <div style={{ width: "30rem" }}>
                  <h2>{data.firstname}</h2>
                  <p>{data.description}</p>
                  <p>{data.email}</p>
                  <p></p>
                </div>
                <img className="prof-file-img" src={`${BaseUrl}/${data.image[0]}`}></img>
              </div>
            </Tab>
            <Tab eventKey="home" title="Workout plan">
              {profile && Object.keys(profile).length > 0 ? (
                <>
                <Row>
                  {list.map((item, index) => (
                    <Col key={index}>
                    <Card style={{ width: "18rem" }} >
                      <Card.Body>
                        <Card.Title>
                          <div dangerouslySetInnerHTML={{ __html: item.title }} />
                        </Card.Title>
                        <Card.Text></Card.Text>
                        {/* <Button onClick={planview}>VIEW</Button> */}
                        <Button component={Link} to={`/workoutview/${item._id}`}>
                          VIEW
                        </Button>
                      </Card.Body>
                    </Card>
                    </Col>
                  ))}
                  </Row>
                </>
              ) : (
                <p>Subscribe for view more details</p>
              )}
            </Tab>
            <Tab eventKey="contact" title="Diet plan">
              {profile && Object.keys(profile).length > 0 ? (
                <>
                <Row>
                  {list2.map((item, index) => (
                    <Col  key={index} >
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>
                          <div dangerouslySetInnerHTML={{ __html: item.title }} />
                        </Card.Title>
                        <Card.Text></Card.Text>
                        {/* <Button onClick={planview}>VIEW</Button> */}
                        <Button component={Link} to={`/dietview/${item._id}`}>
                          VIEW
                        </Button>
                      </Card.Body>
                    </Card>
                    </Col>
                  ))}
                  </Row>
                </>
              ) : (
                <p>Subscribe for view more details</p>
              )}
            </Tab>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Trainersprofile;
