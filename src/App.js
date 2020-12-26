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

const UserInfoContext = React.createContext();
const ACTIONS = {
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  ADD_TO_LIST: "ADD_TO_LIST",
  TOGGLE_WATCHED: "TOGGLE_WATCHED",
  REMOVE_FROM_LIST: "REMOVE_FROM_LIST",
};

const initialState = { isAuth: false, userId: null, MovieList: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      // hard-coded true
      return { ...state, isAuth: true };
    case ACTIONS.LOG_OUT:
      return initialState;
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
            <Route path="/Search">
              <Search />
            </Route>
            <Route path="/MyList">
              {userInfo.isAuth ? <MyList /> : <Redirect exact to="/Login" />}
            </Route>
            <Route path="/Login">
              {userInfo.isAuth ? <Redirect exact to="/Discover" /> : <Login />}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </UserInfoContext.Provider>
  );
}

export { UserInfoContext, ACTIONS, App };
