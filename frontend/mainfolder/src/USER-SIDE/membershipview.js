import React, { useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import bgimg from "../assets/img/banner-bg.jpg";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { useState } from "react";
function Membershipview() {
  const { id } = useParams();
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [list, setlist] = useState([]);
  const [packagelist, setpackagelist] = useState([]);
  const view = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/renewdata/${id}`);
      setlist(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const packageGet = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/subpacakge`);
      setpackagelist(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    view();
    packageGet();
  }, [id]);
  return (
    <div>
      <Navbar />
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Subscription details</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trainer-section about-trainer spad ">
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div className="row">
            <Card style={{ height: "18rem", width: "20rem", marginRight: "5rem" }}>
              <Card.Body style={{}}>
                <Card.Title>
                  {" "}
                  {packagelist.find((listItem) => listItem._id === list.packageId)?.membershiptype}
                </Card.Title>
                <Card.Text>
                  <h3>duration:{list.duration}Months</h3>
                  <h3>Monthlyfee:{list.monthlyfee}</h3>
                  <h3>OTEF:{list.onetimeentrollmentfee}</h3>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "25rem" }}>
              <Card.Body style={{}}>
                <Card.Title>Billing Address</Card.Title>
                <Card.Text>
                  <h5>Name:&nbsp;{list.username}</h5>
                  <h5>Email:&nbsp;{list.email}</h5>
                  <h5>Contact:&nbsp;{list.phonenumber}</h5>
                  <h5>Location:&nbsp;{list.location}</h5>
                  <h5>PIN:&nbsp;{list.pin}</h5>
                  <h5>Country:&nbsp;{list.country}</h5>
                  <br />
                  {list.type === "subscribe" && <p>Total paid: &nbsp; {list.totalpaid}</p>}
                  {list.type === "upgrade" && <p>Total amount: &nbsp; {list.totalpaid} </p>}
                  {list.type === "upgrade" && (
                    <p>Balance paid:&nbsp;{list.type === "upgrade" ? list.balanceAmount : ""}</p>
                  )}
                  <p>Package untill:&nbsp;{new Date(list.expiry_date).toLocaleDateString()}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Membershipview;
