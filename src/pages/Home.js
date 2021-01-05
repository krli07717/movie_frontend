import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { SiThemoviedatabase } from "react-icons/si";
function Home() {
  return (
    <div>
      <section>
        <div>
          <h1>Save your movie list now</h1>
          <h3>Easy sign up, simple usage.</h3>
        </div>
        <div>
          <Link to="/Register">
            <Button type="button">Register</Button>
          </Link>
        </div>
      </section>
      <section>
        <div>
          <h2>Some Image here</h2>
        </div>
        <div>
          <h1>Intuitive movie lookups</h1>
          <h3>Join us and get extra movie recommendations</h3>
        </div>
      </section>
      <section>
        <div>
          <h1>
            Simple web project powered by{" "}
            <a target="_blank" href="https://www.themoviedb.org/">
              <SiThemoviedatabase />
            </a>
          </h1>
          <h3>Check out the source code</h3>
        </div>
        <div>
          <Button type="button">
            <a
              target="_blank"
              href="https://github.com/krli07717/movie_frontend"
            >
              Frontend
            </a>
          </Button>
          <Button type="button">
            <a
              target="_blank"
              href="https://github.com/krli07717/movie_backend"
            >
              Backend
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
