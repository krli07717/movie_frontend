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
import Search from "./pages/Search";
import Discover from "./pages/Discover";
import MyList from "./pages/MyList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { backendInstance as axios } from "./utils/axios";

const UserInfoContext = React.createContext();
const ACTIONS = {
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  FETCH_LIST: "FETCH_LIST",
  ADD_TO_LIST: "ADD_TO_LIST",
  TOGGLE_WATCHED: "TOGGLE_WATCHED",
  REMOVE_FROM_LIST: "REMOVE_FROM_LIST",
};

const initialState = { isAuth: false, userId: null, MovieList: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        isAuth: true,
        userId: action.payload,
        // MovieList: [...state.MovieList, ...action.payload], // useReducer is having issue with this async operation
      };
    case ACTIONS.LOG_OUT:
      return initialState;
    case ACTIONS.FETCH_LIST:
      return {
        ...state,
        MovieList: [...action.payload],
      };
    case ACTIONS.ADD_TO_LIST:
      return { ...state, MovieList: [...state.MovieList, action.payload] };
    case ACTIONS.REMOVE_FROM_LIST:
      return {
        ...state,
        MovieList: state.MovieList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case ACTIONS.TOGGLE_WATCHED:
      return {
        ...state,
        MovieList: state.MovieList.map((item) =>
          item.id === action.payload.id
            ? { ...item, watched: action.payload.watched }
            : item
        ),
      };
    default:
      return state;
  }
};

function App() {
  const [userInfo, dispatch] = useReducer(reducer, initialState);
  const checkAuthentication = async () => {
    try {
      const res = await axios.get("checkjwt");
      console.log("res,,", res);
      // const parseRes = await res.json();
      // console.log("parseRes,,", parseRes);
      res.data === true
        ? dispatch({ type: ACTIONS.LOG_IN })
        : console.log("No Auth");
    } catch (err) {
      console.error(err.message);
    }
  };

  //fetch data list when userId (user logs in)
  useEffect(() => {
    console.log("Id changed", userInfo);
    const getlist = async (userId) => {
      const { data } = await axios.post("getlist", {
        userId,
      });
      const payload = await JSON.parse(data);
      console.log("getlist api fetched", payload);
      await dispatch({ type: ACTIONS.FETCH_LIST, payload: payload });
      console.log("getlist fn dispatched", userInfo);
    };

    if (userInfo.userId) {
      //fetch user list by userid
      getlist(userInfo.userId);
    }
  }, [userInfo.userId]);

  //update database when movielist is modified
  useEffect(() => {
    if (userInfo.isAuth) {
      console.log("updated db");
    }
  }, [userInfo.MovieList]);

  useEffect(() => {
    checkAuthentication();
  }, []);

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
            <Route path="/Search">
              <Search />
            </Route>
            <Route path="/MyList">
              {userInfo.isAuth ? <MyList /> : <Redirect exact to="/Login" />}
            </Route>
            <Route path="/Login">
              {userInfo.isAuth ? <Redirect exact to="/Discover" /> : <Login />}
            </Route>
            <Route path="/Register">
              {userInfo.isAuth ? (
                <Redirect exact to="/Discover" />
              ) : (
                <Register />
              )}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </UserInfoContext.Provider>
  );
}

export { UserInfoContext, ACTIONS, App };
