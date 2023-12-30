import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import "./style.scss";
export const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          "Welcome to our cinematic universe where stories come to life! Dive
          into a world of reviews and exploration as we unravel the magic of
          movies and TV series. Here, passion meets critique, and entertainment
          takes center stage. Whether you're seeking the latest blockbusters,
          hidden gems, or timeless classics, our dedicated team of enthusiasts
          is committed to guiding you through the vast landscape of visual
          storytelling. Join us on this exciting journey, where each review is a
          ticket to adventure and each exploration unveils a new realm of
          cinematic delight. Lights, camera, explore!"
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};
