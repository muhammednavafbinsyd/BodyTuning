import React, { useCallback, useEffect, useState } from "react";
import "../assets/usercss/userprofile.css";
import "../assets/usercss/demo.css";
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import { useParams } from "react-router-dom";
import axios from "axios";
import SoftButton from "components/SoftButton";
import userProfile from "./userProfile";
import Navbar from "./Navbar";
import Footer from "./footer"

function Editprofile() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [userProfile, setuserprofile] = useState("");
  useEffect(() => {
    const getinfo = JSON.parse(localStorage.getItem("userProfile")) || {};
    setuserprofile(getinfo);
  }, []);
  const { id } = useParams();
  const [image, setimage] = useState("");
  const [profile, setprofile] = useState({
    username: "",
    email: "",
    phonenumber: "",
    location: "",
    country: "",
    pin: "",
  });
const [input1,setinput1] = useState("");
const [input2,setinput2] = useState("");
const [input3,setinput3] = useState("");
const [input4,setinput4] = useState("");
const [input5,setinput5] = useState("");
const [input6,setinput6] = useState("");
const [input7,setinput7] = useState("");
const [inavalid,setinvalid] = useState("");
  const fetchuserProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/userprofileEdit/${id}`);
      const data = await response.data;
      setprofile(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    fetchuserProfile();
  }, [fetchuserProfile]);
  const handleupdate = async () => {
    const validationErrors = [];
    if(!profile.username){
      setinput1("Enter a username");
      validationErrors.push("Username is required");
    }else{
      setinput1("")
    }
    if(!profile.email){
     setinput2("Enter a email")
      validationErrors.push("Email is required");
    }else if(!/\S+@\S+\.\S+/.test(profile.email)){
      setinput2("Email is not valid")
      validationErrors.push("Invalid email format");
    }else{
      setinput2(null)
    }
    if(!profile.phonenumber){
      setinput3("Enter a phone number");
      validationErrors.push("Phone number is required");
    }else if (!/^\d{10}$/.test(profile.phonenumber)){
     setinput3("Phone number is not valid")
     validationErrors.push("Invalid phone number format");
    }else{
      setinput3(null)
    }
    if(!profile.location){
      setinput4("Enter a location")
      validationErrors.push("Location must be")
    }else{
      setinput4(null)
    }
    if(!profile.country){
      setinput6('Country is required')
    }else{
      setinput6(null)
    }
    if(!profile.pin){
      setinput7('pin is required')
    }else{
      setinput7(null)
    }
    if(!userProfile.image){
      setinput5("Upload a image")
    }else{
      setinput5(null)
    }
   if(validationErrors.length === 0){
    const data = new FormData();
    data.append("username", profile.username);
    data.append("email", profile.email);
    data.append("phonenumber", profile.phonenumber);
    data.append("location", profile.location);
    data.append("country",profile.country);
    data.append("pin",profile.pin);
    data.append("image", image);
    try {
      const response = await axios.put(
        `${BaseUrl}/userroute/userprofileUpdate/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.href = "/userprofile";
      localStorage.setItem("userProfile", JSON.stringify(response.data.userProfile));
      setinvalid("")
      alert(data, "successfully updated userProfile ");
    } catch (err) {
      console.log(err, "error updating userProfile datas");
      if(err.response && err.response.status === 400){
        setinvalid("Email is already exists");
      }
    }
  }
  };
  const handlechange = (e) => {
    setprofile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="body1">
      <Navbar/>
      <header className="ScriptHeader">
        <div className="rt-container">
          <div className="col-rt-12">
          </div>
        </div>
      </header>
      <section   className="ScriptSection"  >
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
                            alt="student dp"
                          />
                        </div>
                        <div
                          className="card-body d-flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <SoftBox>
                            <SoftInput
                              type="file"
                              onChange={(e) => setimage(e.target.files[0])}
                              name="image"
                              accept="image/*"
                            ></SoftInput>
                            <p style={{color:"red"}} >{input5}</p>
                          </SoftBox>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 className="mb-0">
                            <i className="far fa-clone pr-1" />
                            Edit profile
                          </h3>
                        </div>
                        <div className="card-body pt-0">
                          <SoftBox mb={2}>
                            <SoftInput
                              placeholder="Username"
                              type="text"
                              name="username"
                              value={profile.username}
                              onChange={(e) => setprofile({ ...profile, username: e.target.value })}
                            ></SoftInput>
                            <p style={{color:"red"}}    >{input1}</p>

                          </SoftBox>
                          <SoftBox mb={2}>
                            <SoftInput
                              placeholder="Email Address"
                              type="email"
                              name="email"
                              value={profile.email}
                              onChange={handlechange}
                            ></SoftInput>
                             <p  style={{color:"red"}}  >{input2}</p>
                             {inavalid && <p   style={{color:"red"}}  >{inavalid}</p>}
                          </SoftBox>
                          <SoftBox mb={2}>
                            <SoftInput
                              placeholder="Phone Number"
                              type="number"
                              name="phonenumber"
                              value={profile.phonenumber}
                              onChange={handlechange}
                            ></SoftInput>
                             <p style={{color:"red"}}    >{input3}</p>
                          </SoftBox>
                          <SoftBox mb={2}>
                            <SoftInput
                              placeholder="Location"
                              type="text"
                              name="location"
                              value={profile.location}
                              onChange={handlechange}
                            ></SoftInput>
                             <p   style={{color:"red"}}   >{input4}</p>
                          </SoftBox>
                          <SoftBox mb={2}>
                            <SoftInput
                              placeholder="country"
                              type="text"
                              name="country"
                              value={profile.country}
                              onChange={handlechange}
                            ></SoftInput>
                             <p   style={{color:"red"}}>{input6}</p>
                          </SoftBox>
                          <SoftBox mb={2}>
                            <SoftInput
                              placeholder="pin"
                              type="text"
                              name="pin"
                              value={profile.pin}
                              onChange={handlechange}
                            ></SoftInput>
                             <p  style={{color:"red"}} >{input7}</p>
                          </SoftBox>
                          <SoftBox>
                            <SoftButton onClick={handleupdate}> Save changes </SoftButton>
                          </SoftBox>
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
    
      <Footer/>
    </div>
  );
}

export default Editprofile;
