import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";
import { GiPopcorn, GiHamburgerMenu } from "react-icons/gi";

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
          <GiHamburgerMenu size="20" />
        </div>
        <nav>
          <ul className={navExpand ? "navExpand" : null}>
            {!userInfoContext.userInfoState.isAuth && (
              <li>
                <Link to="/" onClick={() => setNavExpand(false)}>
                  Home
                </Link>
              </li>
            )}
            <li>
              <Link to="/Discover" onClick={() => setNavExpand(false)}>
                Discover
              </Link>
            </li>
            <li>
              <Link to="/Search" onClick={() => setNavExpand(false)}>
                Search
              </Link>
            </li>
            {userInfoContext.userInfoState.isAuth && (
              <li>
                <Link to="/MyList" onClick={() => setNavExpand(false)}>
                  My List
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/Login"
                onClick={() => {
                  setNavExpand(false);
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
