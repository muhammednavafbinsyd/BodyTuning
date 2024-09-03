import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, json, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import sbp from "../assets/img/pexels-victor-freitas-703014.jpg";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import SoftBox from "components/SoftBox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RenderRazorpay from "./razorpayrender";
function Subscribepakage() {
  // razorpay
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const key_id = process.env.REACT_APP_RAZORPAY_KEY_ID;
  const KeySecret = process.env.REACT_APP_RAZORPAY_KEY_SECRET;
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });
  const handleCreateOrder = async (action, amount, currency) => {
    try {
      const formdata = {
        packageId: id,
        oldpkId: currentid,
        userID: userProfile.id,
        username: userProfile.username,
        phonenumber: userProfile.phonenumber,
        email: userProfile.email,
        pin: userProfile.pin,
        location: userProfile.location,
        country: userProfile.country,
        duration: subpackage.duration,
        monthlyfee: subpackage.monthlyfee,
        monthDiff: monthdiff,
        onetimeentrollmentfee: subpackage.onetimeentrollmentfee,
        amount: amount * 100, // convert amount into the lowest unit (e.g., Dollar to Cents)
        currency,
        key_id,
        KeySecret,
      };
      const response = await axios.post(
        `${BaseUrl}/userroute/order?action=${action}`,
        formdata
      );
      const data = response.data;
      setOnshow(false);
      setopen(true);
      setopen400(false);
      setshow400(false);
      if (data && data.order_id) {
        setOrderDetails({
          orderId: data.order_id,
          currency: data.currency,
          amount: data.amount,
        });
        setDisplayRazorpay(true);
      }
    } catch (error) {
       // Handle error here
      console.error("Error creating order:", error);
      if (error.response.status === 400) {
                setopen400(true);
                setshow400(true);
                setopen(false);
        }
    }
  };
  const { id } = useParams();
  const navigate = useNavigate("");
  const [userProfile, setuserprofile] = useState("");
  const [open, setopen] = useState(false);
  const [open400, setopen400] = useState(false);
  const [show400, setshow400] = useState(false);
  const [previousamount, setpreviousamount] = useState(0);
  const [previouslist, setpreviousList] = useState([]);
  const [create, setcreate] = useState();
  const [currentdurations, setcurrentdurations] = useState();
  const [currentmonthlyfee, setcurrentmonthlyfee] = useState();
  const [pkid, setpkid] = useState("");
  const [currentid, setcurrentid] = useState("");
  const [upgradeId, setupgradeID] = useState("");
  const location = useLocation();
  const state = location.state;
  const handleClickOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
    setopen400(false);
  }
  const [onshow, setOnshow] = useState(false);
  const [onshow2, setOnshow2] = useState(false);
  const [onhide, setonhide] = useState(true);
  const [monthdiff, setMonthDiff] = useState("");
  const getdetails = () => {
    setOnshow(true);
    setOnshow2(false);
    setonhide(false);
  };
  const [subpackage, setsubpackage] = useState({
    membershiptype: "  ",
    duration: "",
    monthlyfee: "  ",
    onetimeentrollmentfee: "  ",
    additionalbenefits: "",
  });
  const [duration, setDuration] = useState("");
  const [monthlyfee, setmonthlyfee] = useState("");
  const [onetimeentrollmentfee, setonetimerollmentfee] = useState("");
  const myGeeks = (durations, monthlyfees, onetimeentrollmentfees) => {
    const str = durations;
    const str2 = monthlyfees;
    const str3 = onetimeentrollmentfees;
    let matches = str.replace(/[^0-9]/g, "");
    let matches2 = str2.replace(/[^0-9]/g, "");
    let matches3 = str3.replace(/[^0-9]/g, "");
    if (matches && matches2) {
      setDuration(matches);
      setmonthlyfee(matches2);
      setonetimerollmentfee(matches3);
    }
  };
  useEffect(() => {
    if (state) {
      setpkid(state.pkid);
      setcurrentid(state.pkid);
      setOnshow(true);
      setupgradeID(state.pid);
    } else {
      console.log("Error");
    }
    if (pkid) {
      setcurrentid(false);
    }
    // renewData();
    subpacakgedata();
    setpreviousamount(previous);
    currentPackage(currentid);
    const getinfo = JSON.parse(localStorage.getItem("userProfile")) || {};
    setuserprofile(getinfo);
    myGeeks(subpackage.duration, subpackage.monthlyfee, subpackage.onetimeentrollmentfee);
  }, [id, subpackage.duration, subpackage.monthlyfee, subpackage.onetimeentrollmentfee, create]);
  const subpacakgedata = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/subpacakge/${id}`);
      setsubpackage(response.data);
      setOnshow2(false);
    } catch (error) {
      console.log(error);
    }
  };
  const currentPackage = async (currentid) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/userroute/currentpackage/${currentid}`
      );
      setpreviousList(response.data.data);
      setMonthDiff(response.data.monthDiff);
      setcreate(response.data.data.createdAt);
      setcurrentdurations(response.data.data.duration);
      setcurrentmonthlyfee(response.data.data.monthlyfee);
      setpkid(false);
    } catch (error) {
      console.log(error);
    }
  };
  const balance = currentdurations - monthdiff;
  const previous = balance * currentmonthlyfee;
  function monthDiff(d1, d2) {
    if (!isValidDate(d1) || !isValidDate(d2)) {
      return 0; // Return 0 if either date is invalid
    }
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const differenceInMs = d2 - d1;
    if (differenceInMs >= oneMonthInMs) {
      return months <= 0 ? 1 : months;
    } else {
      return 1;
    }
  }
  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }
  if (!localStorage.getItem("userProfile")) {
    window.location.href = "/login";
  }
  return (
    <div>
      <Navbar />
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${sbp})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>your package</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trainer-section about-trainer spad">
        <div className="container">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="col-lg-4 col-md-4">
              {onhide && (
                <Card style={{ width: "30rem" }}>
                  <Card.Body style={{ margin: "3rem" }}>
                    <div
                      style={{ display: "grid", justifyContent: "center", alignItems: "center" }}
                    >
                      <Card.Title>Package</Card.Title>
                      <Card.Text style={{ width: "20em" }}>
                        <h3>{subpackage.membershiptype}</h3>
                        <h5>{subpackage.duration}</h5>
                        <h5>Monthlyfee{subpackage.monthlyfee}</h5>
                        <h5>One time entrollmentfee{subpackage.onetimeentrollmentfee}</h5>
                      </Card.Text>
                      {pkid && pkid.length > 1 ? (
                        <></>
                      ) : (
                        <Button className="primary-btn" variant="primary" onClick={getdetails}>
                          Subscribe
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
            <div className="col-lg-8 col-md-8">
              {onshow && (
                <Card style={{ width: "40rem", margin: "10% 16% 16% 16%" }}>
                  <Card.Body style={{ margin: "3rem" }}>
                    <div
                      style={{ display: "grid", justifyContent: "center", alignItems: "center" }}
                    >
                      <Card.Title mb={20}>Subscription details</Card.Title>
                      <Card.Text style={{ width: "20em" }}>
                        <label>Your billing details</label>
                        <SoftBox>
                          <h5>{userProfile.username}</h5>
                          <h5>{userProfile.phonenumber}</h5>
                          <h5>{userProfile.email}</h5>
                          <h5>{userProfile.pin}</h5>
                          <h5>{userProfile.location}</h5>
                          <h5>{userProfile.country}</h5>
                          <br />
                        </SoftBox>
                        <div style={{ display: "grid" }}>
                          <SoftBox>
                            <p>{subpackage.duration}</p>
                            <p>
                              <span>Monthlyfee</span>
                              {subpackage.monthlyfee}
                            </p>
                            <p>
                              <span>One time entrollmentfee</span>
                              {subpackage.onetimeentrollmentfee}
                            </p>
                          </SoftBox>
                          {currentid && currentid.length > 1 ? (
                            <SoftBox>
                              <p>Previous amount {previous}</p>
                              <p>
                                Total amount:{" "}
                                {parseInt(duration * monthlyfee) + parseInt(onetimeentrollmentfee)}
                              </p>
                              <h5>
                                Balance paid{" "}
                                {parseInt(duration * monthlyfee) +
                                  parseInt(onetimeentrollmentfee) -
                                  previousamount}
                              </h5>
                            </SoftBox>
                          ) : (
                            <SoftBox>
                              <h5>
                                Total paid:{" "}
                                {parseInt(duration * monthlyfee) + parseInt(onetimeentrollmentfee)}
                              </h5>
                            </SoftBox>
                          )}
                          <SoftBox>
                            {currentid && currentid.length > 1 ? (
                              <button className="primary-btn" onClick={() => handleCreateOrder("upgrade")}>
                                Upgrade
                              </button>
                            ) : (
                              <>
                                {pkid && pkid.length > 1 ? (
                                  <button className="primary-btn" onClick={() => handleCreateOrder("renew")}>
                                    Renew
                                  </button>
                                ) : (
                                  <button
                                    className="primary-btn"
                                    onClick={() => handleCreateOrder("subscribe")}
                                  >
                                    Apply
                                  </button>
                                )}
                              </>
                            )}
                          </SoftBox>
                        </div>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              )}
              <>
                {show400 && (
                  <Dialog
                    open={open400}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        You have an already in plan
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        component={Link}
                        to={"/mysubscription"}
                        autoFocus
                      >
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
                ;
              </>
            </div>
          </div>
        </div>
        {displayRazorpay && (
          <RenderRazorpay
            amount={orderDetails.amount}
            currency={orderDetails.currency}
            orderId={orderDetails.orderId}
            keyId={key_id}
            keySecret={KeySecret}
          />
        )}
        ;
      </section>
      <Footer />
    </div>
  );
}
export default Subscribepakage;
