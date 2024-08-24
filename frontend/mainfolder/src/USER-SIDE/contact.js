import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../assets/usercss/style.css";
import bannerimg5 from "../assets/img/hero-bg.jpg";
import Ourlocation from "../assets/img/icon/location.png";
import Phone from "../assets/img/icon/icon-2.png";
import mail from "../assets/img/icon/icon-3.png";
import Footer from "./footer";
import axios from "axios";
function contact() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");


  const Messesge = async (e) => {
    e.preventDefault();
    if (!name) {
      setInput1("Name is required");
    } else {
      setInput1(null);
    }
    if (!email) {
      setInput2("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setInput2("Email is not a valid email address");
    } else {
      setInput2(null);
    }

    if(!msg){
      setInput3("Message is required");
    }else{
      setInput3(null);
     
        const Sendmsg = {
          name: name,
          email: email,
          msg: msg,
        };
        axios.post(`${BaseUrl}/adminroute/sendmsg`,Sendmsg)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
          if(error.response.status === 400){

          }
        })

      }
    }
    


  return (
    <div>
      <Navbar />
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage:`url(${bannerimg5})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Contact</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-info">
                <h4>Contacts Us</h4>
                <div className="contact-address">
                  <div className="ca-widget">
                    <div className="cw-icon">
                      <img src={Ourlocation} />
                    </div>
                    <div className="cw-text">
                      <h5>Our Location</h5>
                      <p style={{color:"white"}}>60-49 Road 11378 New York</p>
                    </div>
                  </div>
                  <div className="ca-widget">
                    <div className="cw-icon">
                      <img src={Phone} />
                    </div>
                    <div className="cw-text">
                      <h5>Phone:</h5>
                      <p style={{color:"white"}} >+65 11.188.888</p>
                    </div>
                  </div>
                  <div className="ca-widget">
                    <div className="cw-icon">
                      <img src={mail} />
                    </div>
                    <div className="cw-text">
                      <h5>Mail</h5>
                      <p style={{color:"white"}} >bodytuning@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-form">
                <h4>Leave A Comment</h4>
                <form action="#">
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p style={{ color: 'red' }} >{input1}</p>
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        placeholder="Your email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p style={{ color: 'red' }}>{input2}</p>
                     
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        placeholder="Your messages"
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      <p style={{ color: 'red' }}  >{input3}</p>
                      <button type="submit" onClick={Messesge}>Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default contact;
