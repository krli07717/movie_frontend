import React, { useEffect, useReducer } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import MyList from "./pages/MyList";
import Login from "./pages/Login";

const UserInfoContext = React.createContext();
const ACTIONS = { LOG_IN: "LOG_IN", LOG_OUT: "LOG_OUT" };

const initialState = { isAuth: false, userId: null, MovieList: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      // hard-coded true
      return { ...state, isAuth: true };
    case ACTIONS.LOG_OUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

function App() {
  const [userInfo, dispatch] = useReducer(reducer, initialState);
  // const checkAuthenticatin = async() => {
  //   try {
  //     //grab jwt token from localStorage
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // useEffect(()=> {
  //   checkAuthenticatin()
  // },[])
  return (
    <UserInfoContext.Provider
      value={{ userInfoState: userInfo, userInfoDispatch: dispatch }}
    >
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/Discover">
              <Discover />
            </Route>
            <Route path="/MyList">
              <MyList />
            </Route>
            <Route path="/Login">
              {userInfo.isAuth ? <Redirect exact to="/" /> : <Login />}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </UserInfoContext.Provider>
  );
}

export { UserInfoContext, ACTIONS, App };
