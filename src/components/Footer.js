import React from "react";
import tmdblogo from "../logo_tmdb.svg";

function Footer() {
  return (
    <footer>
      <div className="grid">
        <div>
          <h3>MovieList</h3>
          <h3>Powered by TMDB api</h3>
          <h3>
            Check out source code for{" "}
            <a href="https://github.com/krli07717/movie_frontend">Frontend</a> /{" "}
            <a href="https://github.com/krli07717/movie_backend">Backend</a>
          </h3>
        </div>
        <div>
          <a href="https://www.themoviedb.org/">
            <img src={tmdblogo} alt="themoviedb" />
          </a>
        </div>
        <div className="social">
          <a href="#">
            <i className="fab fa-github fa-2x">github</i>
          </a>
          <a href="#">
            <i className="fab fa-facebook fa-2x">facebook</i>
          </a>
          <a href="#">
            <i className="fab fa-instagram fa-2x">instagram</i>
          </a>
          <a href="#">
            <i className="fab fa-twitter fa-2x">twitter</i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
