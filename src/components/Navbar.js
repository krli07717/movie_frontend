import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserInfoContext, ACTIONS } from "../App";

function Navbar() {
  const userInfoContext = useContext(UserInfoContext);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Discover">Discover</Link>
          </li>
          <li>
            <Link to="/Search">Search</Link>
          </li>
          <li>
            <Link to="/MyList">My List</Link>
          </li>
          <li>
            <Link
              to="/Login"
              onClick={() => {
                if (userInfoContext.userInfoState.isAuth) {
                  userInfoContext.userInfoDispatch({ type: ACTIONS.LOG_OUT });
                }
              }}
            >
              {userInfoContext.userInfoState.isAuth ? `Logout` : `Login`}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
