import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import "../assets/usercss/style.css";
import bgimg from "../assets/img/pexels-victor-freitas-2261477.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
function subscribe() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [upgradelist, setupgradelist] = useState([]);
  const [packagelist, setpackagelist] = useState([]);
  const [highestdurations,sethighestdurations] = useState();
  const [onhide, setohide] = useState(true);
  const [onhide2, setonhide2] = useState(true);
  const [pid, setpid] = useState("");
  const [pkid, setpkid] = useState("");
  const location = useLocation();
  const state = location.state;
  const getinfo = JSON.parse(localStorage.getItem("userProfile")) || {};
  useEffect(() => {
    if (state) {
      setohide(false);
      setpkid(state.pkid2);
      setpid(state.pid);  
    } else {
      setonhide2(false);
      setpkid(null);
      setpid(null);
      setpackagelist(null);
    }
    subscribeList();
    subscribedusers(pid);
  }, [pkid]);
  useEffect(() => {
    if (packagelist && upgradelist.length > 0) {
      const filteredList = upgradelist.filter((item) => {
        const packageDuration = parseInt(packagelist.duration);
        const listDuration = parseInt(item.duration);
        return packageDuration < listDuration;
      });
      setupgradelist(filteredList, upgradelist);
    }
  },[packagelist]);
  useEffect(() => {
    if (upgradelist.length === 0) {
      sethighestdurations("YOU ARE USING PREMIUM PACKAGE");
    } else {
      sethighestdurations("")
    }
  }, [upgradelist]);
  const subscribeList = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/subscribeList`);
      setlist(response.data);
      setupgradelist(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const subscribedusers = async (pid) => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/upgrade/${pid}`);
      setpackagelist(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  function subscribe() {
    if (!localStorage.getItem("userProfile")) {
      window.location.href = "/login";
    }
  }
  const Upgrade = (pid) => {
    try {
      const state = {
        pkid,
        pid,
      };
      navigate(`/subscribepackage/${pid}`,{ state });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Add Your Plan Today</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trainer-section about-trainer spad">
        <div className="container">
          {onhide && (
            <div className="row">
              {list.map((item) => (
                <div className="col-lg-4 col-md-6" key={item}>
                  <Card style={{ height: "25rem", margin: "10px" }}>
                    <CardContent style={{ margin: "30px" }}>
                      <div>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.membershiptype}
                        </Typography>
                        <Typography gutterBottom variant="h4" component="div">
                          {item.duration}
                        </Typography>
                      </div>
                      <div>
                        <Typography gutterBottom variant="p" component="div">
                          <p>
                            <span style={{ color: "black" }}>Monthlyfee</span>
                            {item.monthlyfee}{" "}
                          </p>
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                          <p>
                            <span style={{ color: "black" }}>One time entrollmentfee</span>
                            {item.onetimeentrollmentfee}
                          </p>
                        </Typography>
                      </div>
                      <div>
                        <Typography gutterBottom variant="p" component="div">
                          {item.additionalbenefits}
                        </Typography>
                      </div>
                      <div>
                        {" "}
                        <Button
                          className="primary-btn"
                          component={Link}
                          to={`/subscribepackage/${item._id}`}
                          onClick={subscribe}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
          {onhide2 && (
            <div className="row">
              {upgradelist.map((item) => (
                <div className="col-lg-4 col-md-6" key={item._id}>
                  <Card style={{ height: "25rem", margin: "10px" }}>
                    <CardContent style={{ margin: "30px" }}>
                      <div>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.membershiptype}
                        </Typography>
                        <Typography gutterBottom variant="h4" component="div">
                          {item.duration}
                        </Typography>
                      </div>
                      <div>
                        <Typography gutterBottom variant="p" component="div">
                          <p>
                            <span style={{ color: "black" }}>Monthlyfee</span>
                            {item.monthlyfee}{" "}
                          </p>
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                          <p>
                            <span style={{ color: "black" }}>One time entrollmentfee</span>
                            {item.onetimeentrollmentfee}
                          </p>
                        </Typography>
                      </div>
                      <div>
                        <Typography gutterBottom variant="p" component="div">
                          {item.additionalbenefits}
                        </Typography>
                      </div>
                      <div>
                        <Button
                          className="primary-btn"
                          onClick={() => Upgrade(item._id)}
                        >
                          Upgrade
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {highestdurations &&  <p style={{paddingLeft:"30rem"}}>{highestdurations}</p>}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default subscribe;
