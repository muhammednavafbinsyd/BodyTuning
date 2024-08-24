import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import bannerimage2 from "../assets/img/breadcrumb/classes-breadcrumb.jpg";
import Aboutpic from "../assets/img/about-pic.jpg";
import AboutPng from "../assets/img/play.png";
import Aboutsignature from "../assets/img/about-signature.png";
import AboutAward from "../assets/img/award.jpg";
import AboutPersonpng from "../assets/img/banner-person.png";

function about() {
 
  return (
    <div>
      <Navbar />
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage: `url(${bannerimage2})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>About</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* About Section Begin */}
      <section className="about-section about-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-pic">
                <img src={Aboutpic} alt />
                <a
                  href="https://www.youtube.com/watch?v=SlPhMPnQ58k"
                  className="play-btn video-popup"
                >
                  <img src={AboutPng} alt />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h2>Story About Us</h2>
                <p className="first-para">
                  Welcome to Body tuning, where the pursuit of wellness isnt just a goal; its a
                  lifestyle we embody. Our story began with a shared passion for fitness and a
                  vision to create a community where everyone could find their path to a healthier,
                  stronger, and more vibrant self. Founded by Muhammed Nawaf, fitness enthusiasts
                  and certified trainers, our journey was inspired by our own transformative
                  experiences. We understand the challenges and triumphs that accompany every step
                  towards better health because weve walked that path ourselves.
                </p>
                <img src={Aboutsignature} alt />
                <div className="at-author">
                  <h4>Muhammed Nawaf</h4>
                  <span>CEO - Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section End */}
      {/* About Counter Section Begin */}
      <div className="about-counter">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-counter-text">
                <div className="single-counter">
                  <h1 className="counter-num count">98</h1>
                  <p>Programs</p>
                </div>
                <div className="single-counter">
                  <h1 className="counter-num count">14</h1>
                  <p>Locations</p>
                </div>
                <div className="single-counter">
                  <h1 className="counter-num count">50</h1>
                  <span>k+</span>
                  <p>Members</p>
                </div>
                <div className="single-counter">
                  <h1 className="counter-num count">34</h1>
                  <p>Coaches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Counter Section End */}
      {/* Gym Award Section Begin */}
      <section className="gym-award spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="award-text">
                <h2>Best gym award</h2>
                <p>
                  Welcome to the pinnacle of fitness education – the Body Tuning Fitness
                  Certification, designed for those passionate about sculpting bodies and
                  transforming lives. At Body Tuning, we believe that fitness is an art, and our
                  certification program is your gateway to mastering the craft.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <img src={AboutAward} alt />
            </div>
          </div>
        </div>
      </section>
      {/* Gym Award Section End */}
      {/* Banner Section Begin */}
      <section className="banner-section set-bg" data-setbg="img/banner-bg.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-text">
                <h2>Welcome to Body Tuning!</h2>
                <p>
                  At Body Tuning, we are dedicated to revolutionizing the way you perceive fitness
                  and wellness. Our mission is to provide tailored programs and expert guidance that
                  empower individuals to achieve their health goals.
                </p>
                <p>
                  With a team of experienced professionals, we offer personalized training regimes,
                  nutritional guidance, and holistic approaches to optimize your bodys potential. We
                  understand that every individual is unique, and our focus is on crafting
                  personalized plans that suit your specific needs and aspirations.
                </p>
                <p>
                  Contact us today to embark on a transformative journey towards a healthier, more
                  vibrant you!
                </p>

                <a href="/contact" className="primary-btn banner-btn">
                  Contact Now
                </a>
              </div>
            </div>
            <div className="col-lg-5">
              <img src={AboutPersonpng} alt />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* Footer Section End */}
      {/* Js Plugins */}
    </div>
  );
}

export default about;
