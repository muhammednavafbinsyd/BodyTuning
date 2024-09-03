import "../assets/usercss/user-profile.css";
import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link, useNavigate } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Userprofilebg from "../assets/img/hero-bg.jpg"

function userProfile() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const [userProfile, setuserprofile] = useState("");
  const [list, setList] = useState([]);
  const [packagelist, setpackagelist] = useState([]);
  useEffect(() => {
    const getinfo = JSON.parse(localStorage.getItem("userProfile")) || {};
    setuserprofile(getinfo);
    const userId = getinfo.id; 
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
    Subscription(userId);
    packageGet();
    if(!localStorage.getItem("usertoken")){
      navigate('/')
    }
  }, []); 

        
  return (
    <div>
      <Navbar  />
      <section style={{
        backgroundImage: `url(${Userprofilebg})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat"

      }} >
        <div className="rt-container">
          <div className="col-rt-12">
            <div className="Scriptcontent">
              <div className="student-profile">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card">
                        <div className="card-header bg-transparent text-center">
                          <img
                            className="profile_img"
                            src={`${BaseUrl}/${userProfile.image}`}
                            alt="User Pic"
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
                    <div className="col-lg-6">
                      <div className="card">
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
                      <div className="card my-4">
                        <div className="p-2">
                          <h3 className="">
                            Recent Plan
                          </h3>
                        </div>
                        <div className="container">
                          <div className="row">
                            {list && (
                              <div className="col-md-4 col-lg-8 pb-2">
                                <Card>
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default userProfile;
