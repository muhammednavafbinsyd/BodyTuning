import React, { useEffect, useState } from "react";
import "../assets/usercss/userprofile.css";
import "../assets/usercss/demo.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link, useParams } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import Navbar from "./Navbar";
import Footer from "./footer";
import axios from "axios";
import Card from "react-bootstrap/Card";
function userProfile() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [userProfile, setuserprofile] = useState("");
  const [list, setList] = useState([]);
  const [packagelist, setpackagelist] = useState([]);
  const Subscription = async (id) => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/packageIdget/${id}`);
      setList(response.data);
    } catch (err) {
      console.log(err, "Error");
    }
  };
  const packageGet = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/subpacakge`);
      setpackagelist(response.data);
    } catch (err) {
      console.log(err, "Error");
    }
  };
  useEffect(() => {
    const getinfo = JSON.parse(localStorage.getItem("userProfile")) || {};
    setuserprofile(getinfo);
    const userId = getinfo.id; 
    Subscription(userId);
    packageGet();
  }, []); 
  return (
    <div className="body1">
      <Navbar />
      <header className="ScriptHeader">
        <div className="rt-container">
          <div className="col-rt-12"></div>
        </div>
      </header>
      <section className="ScriptSection">
        <div className="rt-container">
          <div className="col-rt-12">
            <div className="Scriptcontent">
              {/* Student Profile */}
              <div className="student-profile py-4">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent text-center">
                          <img
                            className="profile_img"
                            src={`${BaseUrl}/${userProfile.image}`}
                            alt="user dp"
                          />
                          <h3>{userProfile.username}</h3>
                        </div>
                        <div
                          className="card-body d-flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <SoftTypography
                            style={{ cursor: "pointer" }}
                            component={Link}
                            to={`/editprofile/${userProfile.id}`}
                          >
                            <BorderColorIcon />
                          </SoftTypography>
                          <p>Edit your profile </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 className="mb-0">
                            <i className="far fa-clone pr-1" />
                            General Information
                          </h3>
                        </div>
                        <div className="card-body pt-0">
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <th width="30%">User name</th>
                                <td width="2%">:</td>
                                <td>{userProfile.username}</td>
                              </tr>
                              <tr>
                                <th width="30%">Email </th>
                                <td width="2%">:</td>
                                <td>{userProfile.email}</td>
                              </tr>
                              <tr>
                                <th width="30%">Contact</th>
                                <td width="10%">:</td>
                                <td>{userProfile.phonenumber}</td>
                              </tr>
                              <tr>
                                <th width="30%">Location</th>
                                <td width="2%">:</td>
                                <td>{userProfile.location}</td>
                              </tr>
                              <tr>
                                <th width="30%">Country</th>
                                <td width="2%">:</td>
                                <td>{userProfile.country}</td>
                              </tr>
                              <tr>
                                <th width="30%">pin</th>
                                <td width="2%">:</td>
                                <td>{userProfile.pin}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div style={{ height: 26 }} />
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 className="mb-0">
                            <i className="far fa-clone pr-1" />
                            Recent subscription
                          </h3>
                        </div>
                        <div className=" container card-body pt-0">
                          <div className="row">
                            {list && (
                              <div className="col-md-6 col-lg-6">
                                <Card style={{ width: "18rem" }}>
                                  <Card.Body>
                                    <Card.Title>
                                      {
                                        packagelist.find(
                                          (listItem) => listItem._id === list.packageId
                                        )?.membershiptype
                                      }
                  
                                    </Card.Title>
                                    <Card.Text></Card.Text>
                                  </Card.Body>
                                </Card>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* partial */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* Analytics */}
    </div>
  );
}
export default userProfile;
