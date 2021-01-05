import React from "react";
import tmdblogo from "../logo_tmdb.svg";
import { FaGithub, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="grid">
        <div>
          <h3>MovieList</h3>
          <h3>Powered by TMDB api</h3>
          <h3>
            Check out source code for{" "}
            <a
              target="_blank"
              href="https://github.com/krli07717/movie_frontend"
            >
              Frontend
            </a>
            /
            <a
              target="_blank"
              href="https://github.com/krli07717/movie_backend"
            >
              Backend
            </a>
          </h3>
        </div>
        <div>
          <a target="_blank" href="https://www.themoviedb.org/">
            <img src={tmdblogo} alt="themoviedb" />
          </a>
        </div>
        <div className="social">
          <a href="#">
            <FaGithub />
          </a>
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
