import React from "react";
import tmdblogo from "../logo_tmdb.svg";
// import { FaGithub, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
function Footer() {
  return (
    <footer>
      <div className="container flex">
        <div className="box">
          <div className="intro">
            <h4>MovieList</h4>
            <h4>Powered by TMDB api</h4>
            <h4>Check out source code</h4>
          </div>
          <div className="repos">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/krli07717/movie_frontend"
            >
              Frontend
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/krli07717/movie_backend"
            >
              Backend
            </a>
          </div>
        </div>
        <div className="tmdb box">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.themoviedb.org/"
          >
            <img
              width="166"
              height="120"
              className="tmdblogo"
              src={tmdblogo}
              alt="themoviedb"
            />
          </a>
        </div>
        <div className="box">
          <div className="links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/krli07717/movie_frontend"
            >
              <h4>Terms of Use</h4>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/krli07717/movie_frontend"
            >
              <h4>Corporate Information</h4>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/krli07717/movie_frontend"
            >
              <h4>Media Center</h4>
            </a>
          </div>
          <div className="icons">
            <div>
              <a target="_blank" rel="noreferrer" href="https://github.com/">
                <AiOutlineGithub size="30" />
              </a>
            </div>
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/"
              >
                <AiOutlineFacebook size="30" />
              </a>
            </div>
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/"
              >
                <AiOutlineInstagram size="30" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noreferrer" href="https://twitter.com/">
                <AiOutlineTwitter size="30" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
