import React from "react";
import Footer from "./footer";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FaSquareXTwitter, FaInstagram, FaDribbble } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";

function footer() {
  return (
    <div>
      <footer className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact-option">
                <span>Phone</span>
                <p>(123) 118 9999 - (123) 118 9999</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-option">
                <span>Address</span>
                <p>72 Kangnam, 45 Opal Point Suite 391</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-option">
                <span>Email</span>
                <p>bodytuningz@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="subscribe-option set-bg" data-setbg="img/footer-signup.jpg">
            <div className="so-text">
              <h4>Subscribe To Our Mailing List</h4>
              <p>Sign up to receive the latest information </p>
            </div>
          </div>
          <div className="copyright-text">
            <ul>
              <li>
                <a href="#">Term&amp;Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
            <p>©</p>
            <p>
              Copyright © All rights reserved | Developed by Fortran
              <i className="fa fa-heart" aria-hidden="true" />
            </p>
            <p />
            <div className="footer-social">
              <a href="#">
                <FacebookIcon />
              </a>
              <a href="#">
                <FaSquareXTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaDribbble />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default footer;
