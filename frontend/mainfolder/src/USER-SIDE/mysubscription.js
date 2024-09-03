import "../assets/usercss/style.css"
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import myspbgimg from "../assets/img/pexels-rdne-stock-project-7187878.jpg";
import Button from "@mui/material/Button";
import { Link,useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import SoftTypography from "components/SoftTypography";
function mysubscription() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate("");
  const [profile, setprofile] = useState("");
  const [id, setid] = useState("");
  const [list, setlist] = useState([]);
  const [packagelist, setpackagelist] = useState([]);
  const [remaining, setremaining] = useState("");
  useEffect(() => {
    const getdata = JSON.parse(localStorage.getItem("userProfile"))||{};
    setprofile(getdata);
    setid(getdata.id);
    const Subscription = async (id) => {
      try {
        const response = await axios.get(`${BaseUrl}/userroute/mysubscriptionList/${id}`);
        setlist(response.data.data);
        setremaining(response.data.remainingDays);
      } catch (error) {
        console.log(error);
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
    Subscription(id);
    packageGet();
  }, [id]);

  const stateID = (pkid) => {
    try {
      const state = {
        id,
        pkid,
      };
      navigate(`/subscribepackage/${pkid}`,{ state });
    } catch (err) {
      console.log(err);
    }
  };
  const stateID2 = (pkid2, pid) => {
    try {
      const state = {
        pid,
        pkid2,
      };
      navigate("/subscribe", { state });
    } catch (error) {
      console.log(error);
    }
  };
  const anyActivePackageExists = list.some((item) => new Date(item.expiry_date) >= new Date());
  return (
    <div>
      <Navbar />
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage: `url(${myspbgimg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2 style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'}} >My subscription</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trainer-section about-trainer spad">
          <TableContainer component={Paper}>
              <Table style={{display:'flex',justifyContent:"center"}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No:</TableCell>
                    <TableCell>Memmbership Type</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Monthly Fee</TableCell>
                    <TableCell>OTEF</TableCell>
                    <TableCell>Total Paid</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Expire Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell >Actions</TableCell>
                  </TableRow>
                <TableBody>
                  {list.map((item, index) => {
                    const packageItem = packagelist.find(
                      (listItem) => listItem._id === item.packageId
                      );
                      const anySubscriptionExpired = list.every(
                        (item) => new Date(item.expiry_date) < new Date()
                        );
                    const isPackageActive = new Date(item.expiry_date) >= new Date();
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{packageItem?.membershiptype}</TableCell>
                        <TableCell>{packageItem?.duration}</TableCell>
                        <TableCell>{packageItem?.monthlyfee}</TableCell>
                        <TableCell>{packageItem?.onetimeentrollmentfee}</TableCell>
                        <TableCell>{item.type === "upgrade" ? item.balanceAmount : item.totalpaid}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          {new Date(item.expiry_date).toLocaleDateString()}
                          {remaining===null ? (
                            <p></p>
                            ):(<p style={{ color: "red", fontSize: "10px" }}>Your pack expire in{remaining}days</p>)}
                        </TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          {anySubscriptionExpired ? (
                            <Button onClick={() => stateID(item.packageId)}>Renew</Button>
                            ) : (
                              <Button component={Link} to={`/membershipview/${item._id}`}>
                              View
                            </Button>
                          )}
                          {isPackageActive && anyActivePackageExists && (
                            <Button onClick={() => stateID2(item._id,item.packageId)}>
                              Upgrade
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                  </TableHead>
              </Table>
            </TableContainer>
      </section>
      <Footer />
    </div>
  );
}

export default mysubscription;
