import React from "react";
import { Link } from "react-router-dom";
import banner1 from "../../../assets/banner.jpeg";
import './Tutorials.css'

const Tutorials = () => {
  return (
    <div className="col-md-12 py-2 timetable">
      <img src={banner1} alt="banner" className="bannerImg"/>
    </div>
  );
};

export default Tutorials;
