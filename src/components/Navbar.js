import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserInfoContext, ACTIONS } from "../App";
import { backendInstance as axios } from "../utils/axios";

function Navbar() {
  const userInfoContext = useContext(UserInfoContext);
  const deleteJwtToken = async () => {
    const res = await axios.get("auth/deleteToken");
    return;
  };
  return (
    <div>
      <div className="flex">
        <h1>MovieList</h1>
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
