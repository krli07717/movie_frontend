import React from "react";
import tmdblogo from "../logo_tmdb.svg";

function Footer() {
  return (
    <footer>
      <h3>I'm Footer</h3>
      <img src={tmdblogo} alt="themoviedb" />
    </footer>
  );
}

export default Footer;
