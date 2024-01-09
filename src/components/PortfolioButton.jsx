// ButtonLink.js
import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ to, buttonText }) => (
  <Link to={to}>
    <button style={{ float: "right" }} className="button">
      {buttonText}
    </button>
  </Link>
);

export default ButtonLink;
