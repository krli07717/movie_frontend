import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import { GiPopcorn } from "react-icons/gi";
import { FaListUl } from "react-icons/fa";

function Navbar() {
  const userInfoContext = useContext(UserInfoContext);
  const [navExpand, setNavExpand] = useState(false);
  const deleteJwtToken = async () => {
    const res = await axios.get("auth/deleteToken");
    return;
  };
  return (
    <div className="navbar">
      <div className="container flex">
        <div className="logo">
          <h1>MovieList</h1>
          <span>
            <GiPopcorn size="20" />
          </span>
        </div>
        <div
          className="hamburger"
          onClick={() => setNavExpand((prev) => !prev)}
        >
          <FaListUl size="20" />
        </div>
        <nav>
          <ul className={navExpand ? "navExpand" : null}>
            {!userInfoContext.userInfoState.isAuth && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
            <li>
              <Link to="/Discover">Discover</Link>
            </li>
            <li>
              <Link to="/Search">Search</Link>
            </li>
            {userInfoContext.userInfoState.isAuth && (
              <li>
                <Link to="/MyList">My List</Link>
              </li>
            )}
            <li>
              <Link
                to="/Login"
                onClick={() => {
                  if (userInfoContext.userInfoState.isAuth) {
                    userInfoContext.userInfoDispatch({ type: ACTIONS.LOG_OUT });
                    deleteJwtToken();
                  }
                }}
              >
                {userInfoContext.userInfoState.isAuth ? `Logout` : `Login`}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
