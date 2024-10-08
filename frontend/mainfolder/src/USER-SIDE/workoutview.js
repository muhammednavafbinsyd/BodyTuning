import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import pagebg from "../assets/img/pexels-lukas-669577.jpg";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
function workoutview() {
  const BaseUrl = process.env.REACT_APP_BASE_URL
  const [list, setlist] = useState([]);
  const [list2, setlist2] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  location.state;
  useEffect(() => {
    const gettype = async (id) => {
      try {
        const response = await axios.get(`${BaseUrl}/userroute/typeGet/${id}`);
        setlist(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const geteditworkoutplan = async (id) => {
      try {
        const response = await axios.get(`${BaseUrl}/userroute/trainerworkoutplanview/${id}`);
        const data = response.data;
        setlist2(data);
      } catch (err) {
        console.log(err);
      }
    };
    gettype(id);
    geteditworkoutplan(id);
  }, [id]);
  return (
    <div>
      <Navbar />
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${pagebg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2 style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)'}}>FITNESS PLAN</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        {list.map((item, index) => (
          <div className="row" key={index}>
            <div dangerouslySetInnerHTML={{ __html: item.title }} />
            <div 
              dangerouslySetInnerHTML={{
                __html: item.day1,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: item.day2,
              }}
            />{" "}
            <div
              dangerouslySetInnerHTML={{
                __html: item.day3,
              }}
            />{" "}
            <div
              dangerouslySetInnerHTML={{
                __html: item.day4,
              }}
            />{" "}
            <div
              dangerouslySetInnerHTML={{
                __html: item.day5,
              }}
            />{" "}
            <div
              dangerouslySetInnerHTML={{
                __html: item.day6,
              }}
            />{" "}
            <div
              dangerouslySetInnerHTML={{
                __html: item.day7,
              }}
            />{" "}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default workoutview;
