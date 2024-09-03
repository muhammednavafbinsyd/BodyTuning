import React, { Profiler, useEffect, useState } from "react";
import "../assets/usercss/style.css";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link, useNavigate } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import logoimage from "../assets/img/Web_capture_1-11-2023_94336_-removebg.png";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
// drawer
import ToggleButton from "@mui/material/ToggleButton";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

function Navbar() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [signupHide, setsignUphide] = useState(false);
  const [nameShow, setNameShow] = useState(false);
  const [profile, setProfile] = useState("");
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const [isToggled, setIsToggled] = useState(true);

  const handleToggleClick = (anchor) => {
    setIsToggled(isToggled);
    toggleDrawer(anchor, !state[anchor])(); // Manually toggle the drawer
  };

  useEffect(() => {
    const getName = JSON.parse(localStorage.getItem("userProfile")) || {};
    setProfile(getName);
    if (localStorage.getItem("userProfile")) {
      setNameShow(true);
      setsignUphide(false);
    } else{
      setNameShow(false);
      setsignUphide(true);
    }
  }, []);

  function Logout() {
      try{
        localStorage.removeItem("userProfile");
        localStorage.removeItem("appliedPackage");
        localStorage.removeItem("usertoken");
        setNameShow(false);
        setsignUphide(true);
        navigate("/");
      }catch(error){
        console.log(error);
      }
  }

  const list = (anchor) => (
    <Box
      className="nav-toggler bg-transparent"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List disablePadding>
        <div
          style={{
            width: "5%",
            height: "2rem",
            display: "block",
            position: "relative",
            left: "11rem",
            top: "10px",
          }}
        />
        <div style={{ marginTop: "2rem" }}>
          <ul className="ml-10" >
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li >
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/trainersfront">TRAINERS</Link>
            </li>
            <li>
              <Link to="/workoutfront">WORKOUT</Link>
            </li>
            <li>
              <Link to="/dietfront">DIET</Link>
            </li>
            <li>
              <Link to="/blog">BLOG</Link>
            </li>
            <li>
              <Link to="/gallery">GALLERY</Link>
            </li>
            <li>
              <Link to="/contact">CONTACTS</Link>
            </li>
          </ul>
        </div>
      </List>
      <Divider />
      {nameShow && (
        <>
          <List>
            <ul className="ml-10" >
              <li key="user-profile-link">
                <SoftTypography component={Link} to={"/userprofile"}>
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
                    <span>{profile.username}</span>
                  </SoftBox>
                </SoftTypography>
              </li>
              <li key="my-subscription-link">
                <SoftTypography component={Link} to={"/mysubscription"}>
                  My subscription
                </SoftTypography>
              </li>
              <li key="change-password-link">
                <SoftTypography component={Link} to={"/changepasscode"}>
                  Change Password
                </SoftTypography>
              </li>
              <li key="logout-link">
                <SoftTypography className="cursor-pointer" onClick={Logout}>
                  <LogoutIcon /> Log out
                </SoftTypography>
              </li>
            </ul>
          </List>
        </>
      )}
      {signupHide && (
        <List >
          <ul className="ml-10">
            <li key="login-link">
              <Link to="/login" className="primary-btn signup-btn">
                Login
              </Link>
            </li>
          </ul>
        </List>
      )}
      <Divider />
      <List >
        <ul className="ml-10">
          <li key="subscribe-link">
            <Link to="/subscribe" className="primary-btn signup-btn">
              Subscribe
            </Link>
          </li>
        </ul>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <header className="header-section">
        <div className="container">
          <div className="logo">
            <a href="/">
              <img style={{ width: "4rem" }} src={logoimage} alt="logo" />
            </a>
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul className="mt-3">
                <li key="navbar-home">
                  <Link to="/">Home</Link>
                </li>
                <li key="navbar-about">
                  <Link to="/about">About</Link>
                </li>
                <li key="navbar-trainers">
                  <Link to="/trainersfront">Trainers</Link>
                </li>
                <li key="navbar-workout">
                  <Link to="/workoutfront">Workout</Link>
                </li>
                <li key="navbar-diet">
                  <Link to="/dietfront">Diet</Link>
                </li>
                <li key="navbar-blog">
                  <Link to="/blog">Blog</Link>
                </li>
                <li key="navbar-gallery">
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li key="navbar-contacts">
                  <Link to="/contact">Contacts</Link>
                </li>
              </ul>
            </nav>
            {nameShow && (
              <>
                {[profile.username].map((variant, index) => (
                  <React.Fragment key={`dropdown-${index}`}>
                    <DropdownButton
                      className="primary-btn signup-btn dropdwn"
                      as={ButtonGroup}
                      key={`variant-${index}`} // Updated key here
                      id={`variant-${variant}`}
                      variant="none"
                      title={variant}
                      style={{ borderRadius: 0 }}
                    >
                      <Dropdown.Item key={`profile-${index}-1`}>
                        <SoftBox
                          component={Link}
                          to={"/userprofile"}
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
                          <Link to="/userprofile">{profile.username}</Link>
                        </SoftBox>
                      </Dropdown.Item>
                      <Dropdown.Item key={`profile-${index}-2`}>
                        <Link to={"/mysubscription"}>
                          <CardMembershipIcon /> My subscription
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item key={`profile-${index}-3`}>
                        <Link to={"/changepasscode"}>
                          <LockResetIcon /> Change Password
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item key={`profile-${index}-4`} onClick={Logout}>
                        <a>
                          <LogoutIcon /> Log out
                        </a>
                      </Dropdown.Item>
                    </DropdownButton>
                    <Link to="/subscribe" className="primary-btn signup-btn">
                      Subscribe
                    </Link>
                  </React.Fragment>
                ))}
              </>
            )}
            {signupHide && (
              <>
                <Link to="/login" className="primary-btn signup-btn">
                  Login
                </Link>
                <Link to="/subscribe" className="primary-btn signup-btn">
                  Subscribe
                </Link>
              </>
            )}
          </div>
          <div id="mobile-menu-wrap" />
        </div>
        <div className="toggler-div">
          {["right"].map((anchor, index) => (
            <React.Fragment key={index}>
              <ToggleButton className="nav-toggler"
               value="check" color="secondary"
               selected={isToggled} 
               onClick={() => handleToggleClick(anchor)}>
                <FormatAlignCenterIcon  />
              </ToggleButton>
              <Drawer
                className="nav-toggler"
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(2px)",
                    height: "auto",
                  },
                }}
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
