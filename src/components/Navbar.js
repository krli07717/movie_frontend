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
          <h1>電影清單</h1>
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
        <div>
          <nav>
            <ul className={navExpand ? "navExpand" : null}>
              {!userInfoContext.userInfoState.isAuth && (
                <li>
                  <Link to="/" onClick={() => setNavExpand(false)}>
                    首頁
                  </Link>
                </li>
              )}
              <li>
                <Link to="/Discover" onClick={() => setNavExpand(false)}>
                  探索
                </Link>
              </li>
              <li>
                <Link to="/Search" onClick={() => setNavExpand(false)}>
                  搜尋
                </Link>
              </li>
              {userInfoContext.userInfoState.isAuth && (
                <li>
                  <Link to="/MyList" onClick={() => setNavExpand(false)}>
                    我的清單
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/Login"
                  onClick={() => {
                    setNavExpand(false);
                    if (userInfoContext.userInfoState.isAuth) {
                      userInfoContext.userInfoDispatch({
                        type: ACTIONS.LOG_OUT,
                      });
                      deleteJwtToken();
                    }
                  }}
                >
                  {userInfoContext.userInfoState.isAuth ? `登出` : `登入`}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
