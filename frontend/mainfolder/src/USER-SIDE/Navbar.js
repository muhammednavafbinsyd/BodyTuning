import React, { useEffect, useState } from "react";
import "../assets/usercss/style.css";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import logoimage from "../assets/img/Web_capture_1-11-2023_94336_-removebg.png";
import Button from "react-bootstrap/Button";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// drawer
import ToggleButton from "@mui/material/ToggleButton";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
function Navbar() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      className="nav-toggler"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List disablePadding>
        <div style={{width:"5%", height:"2rem", display:"bloak", position:"relative" , left:"11rem" ,top:"10px" }} >
        </div>
        <div style={{ marginTop: "2rem" }}>
          <ul>
            <a href="/home">HOME</a> <br />
            <a href="/about">ABOUT </a>
            <br />
            <a href="/trainersfront">TRAINERS</a>
            <br />
            <a href="/workoutfront">WORKOUT</a> <br />
            <a href="/dietfront">DIET</a>
            <br />
            <a href="/blog">BLOG</a>
            <br />
            <a href="/gallery">GALLERY</a>
            <br />
            <a href="/contact">CONTACTS</a>
          </ul>
        </div>
      </List>
      <Divider />
      <List>
        <ul>
          <SoftTypography component={Link} to={"/userprofile"}>
            <>
              <SoftBox
                style={{
                  display: "flex",
                  alignItems: "center", 
                  gap: "8px",
                }}
              >
                <SoftAvatar
                  src={`${BaseUrl}/${profile.image}`}
                  alt="profile-image"
                  variant="contain"
                  size="xs"
                  shadow="sm"
                />
                <span>Profile</span>
              </SoftBox>
            </>
          </SoftTypography>{" "}
          <SoftTypography component={Link} to={"/mysubscription"}>
            My subscription
          </SoftTypography>
          <br />
          <SoftTypography component={Link} to={"/changepasscode"}>
            Change Password
          </SoftTypography>{" "}
          <br />
          <SoftTypography>
            {" "}
            <LogoutIcon /> Log out
          </SoftTypography>
        </ul>
      </List>
      <Divider />
      <List>
        <ul>
          <SoftBox component={Link} to={"/subscribe"}>
            <Button variant="secondary">Subscribe</Button>
          </SoftBox>
        </ul>
      </List>
      <Divider />
    </Box>
  );
  const [signupHide, setsignUphide] = useState(false);
  const [nameShow, setNameShow] = useState(false);
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const getName = JSON.parse(localStorage.getItem("userProfile")) || {};
    setProfile(getName);
    if (localStorage.getItem("userProfile")) {
      setNameShow(true);
      setsignUphide(false);
    } else {
      setNameShow(false);
      setsignUphide(true);
    }
  }, []);
  function Logout() {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("appliedPackage");
    localStorage.removeItem("usertoken");
    window.location.href = "/home";
  }
  return (
    <div>
      {/* Header Section Begin */}
      <header className="header-section">
        <div className="container">
          <div className="logo">
            <a href="/home">
              <img style={{ width: "4rem" }} src={logoimage}></img>
            </a>
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul>
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/trainersfront">Trainers</a>
                </li>
                <li>
                  <a href="/workoutfront">Workout</a>
                </li>
                <li>
                  <a href="/dietfront">Diet</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
                <li>
                  <a href="/contact">Contacts</a>
                </li>
              </ul>
            </nav>
            {nameShow && (
              <>
                {[profile.username].map((variant) => (
                  <>
                    <DropdownButton
                      className="primary-btn signup-btn"
                      as={ButtonGroup}
                      key={variant}
                      id={`variant-${variant}`}
                      variant="none"
                      title={variant}
                      style={{ border: "none", marginRight: "1rem", boxShadow: "none" }}
                    >
                      <Dropdown.Item>
                        <SoftTypography component={Link} to={"/userprofile"}>
                          <>
                            <SoftBox
                              style={{
                                display: "flex",
                                alignItems: "center", 
                                gap: "8px", 
                              }}
                            >
                              <SoftAvatar
                                src={`${BaseUrl}/${profile.image}`}
                                alt="profile-image"
                                variant="contain"
                                size="xs"
                                shadow="sm"
                              />
                              <span>Profile</span>
                            </SoftBox>
                          </>
                        </SoftTypography>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <SoftTypography component={Link} to={"/mysubscription"}>
                          <CardMembershipIcon /> My subscription
                        </SoftTypography>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <SoftTypography component={Link} to={"/changepasscode"}>
                          <LockResetIcon /> Change Password
                        </SoftTypography>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={Logout}>
                        <SoftTypography>
                          {" "}
                          <LogoutIcon /> Log out
                        </SoftTypography>
                      </Dropdown.Item>
                    </DropdownButton>
                    <SoftBox component={Link} to={"/subscribe"}>
                      <Button variant="secondary">Subscribe</Button>
                    </SoftBox>
                  </>
                ))}
              </>
            )}
            {signupHide && (
              <>
                <a href="/login" className="primary-btn signup-btn">
                  Login
                </a>

                <SoftBox component={Link} to={"/subscribe"}>
                  <Button variant="secondary">Subscribe</Button>
                </SoftBox>
              </>
            )}
          </div>
          <div id="mobile-menu-wrap" />
        </div>
        <div className="toggler-div">
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <ToggleButton className="nav-toggler">
                <FormatAlignCenterIcon onClick={toggleDrawer(anchor, true)} className="nav-toggler">
                  {anchor}{" "}
                </FormatAlignCenterIcon>
              </ToggleButton>
              <Drawer
                className="nav-toggler"
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
