import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "../assets/usercss/style.css";
import bannerimg6 from "../assets/img/breadcrumb/classes-breadcrumb.jpg";
import axios from "axios";
function gallery() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [allgallery, setallgallery] = useState([]);
  const [filteredGallery, setFilteredGallery] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  useEffect(() => {
    getgallery();
  }, []);
  const getgallery = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/userroute/allgallery`);
      setallgallery(response.data);
      setFilteredGallery(response.data);
    } catch (err) {
      console.log(err);
    }
  };  
  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredGallery(allgallery);
    } else {
      const filteredItems = allgallery.filter((item) => item.category === category);
      setFilteredGallery(filteredItems);
    }
  };
  return (
    <div>
      <Navbar />
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage: `url(${bannerimg6})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2 style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'}}>Gallery</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Gallery Section Begin */}
      <div className="gallery-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="gallery-controls">
              <li className={activeFilter === "all" ? "active" : ""} onClick={() => handleFilter("all")}>
                  all gallery
                </li>
                <li className={activeFilter === "Fitness" ? "active" : ""} onClick={() => handleFilter("Fitness")}>
                  fitness
                </li>
                <li className={activeFilter === "Coaching" ? "active" : ""} onClick={() => handleFilter("Coaching")}>
                  coaching
                </li>
                <li className={activeFilter === "Event" ? "active" : ""} onClick={() => handleFilter("Event")}>
                  event
                </li>
                <li className={activeFilter === "Other" ? "active" : ""} onClick={() => handleFilter("Others")}>
                  other
                </li>              </ul>
            </div>
          </div>
          <div className="row gallery-filter">
          {filteredGallery.map((item, index) => (
              <div className={`col-lg-4 mix all ${item.category}`} key={index}>
                <img src={`${BaseUrl}/uploads/${item.image}`} alt={`Gallery ${index}`} />
              </div>
            ))}
          </div>
        </div>
        {/* Gallery Section End */}
      </div>
      <Footer />
    </div>
  );
}
export default gallery;
