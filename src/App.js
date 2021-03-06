import React, { useEffect, useReducer, Suspense, lazy } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import Layout from "./layouts/Layout";
// import Home from "./pages/Home";
// import Search from "./pages/Search";
// import Discover from "./pages/Discover";
// import MyList from "./pages/MyList";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import { backendInstance as axios } from "./utils/axios";
import loading from "./loading2.gif";

const Layout = lazy(() => import("./layouts/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Discover = lazy(() => import("./pages/Discover"));
const MyList = lazy(() => import("./pages/MyList"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

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
      const {
        data: { user_id },
      } = await axios.get("auth/checkjwt");
      dispatch({ type: ACTIONS.LOG_IN, payload: user_id });
      // console.log("jwt passed");
    } catch (err) {
      console.error(err);
    }
  };

  const getlist = async (userId) => {
    try {
      const { data } = await axios.post("movies/getlist", {
        userId,
      });
      const payload = await JSON.parse(data);
      // console.log("getlist api fetched", payload);
      dispatch({ type: ACTIONS.FETCH_LIST, payload: payload });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDb = async () => {
    try {
      await axios.put("movies/updatedb", {
        userId: userInfo.userId,
        MovieList: userInfo.MovieList,
      });
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch data list when userId (user logs in)
  useEffect(() => {
    if (userInfo.userId) {
      getlist(userInfo.userId);
    }
  }, [userInfo.userId]);

  //update database when movielist is modified
  useEffect(() => {
    // will trigger updatedb when user simply logs in
    if (userInfo.userId !== null) {
      updateDb();
    }
  }, [userInfo.MovieList]);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const loadingComponent = () => {
    return (
      <div className="loading">
        <img src={loading} alt="loading spinner" />
      </div>
    );
  };

  return (
    <UserInfoContext.Provider
      value={{ userInfoState: userInfo, userInfoDispatch: dispatch }}
    >
      <Router>
        <Suspense fallback={loadingComponent()}>
          <Layout>
            <Switch>
              <Route path="/" exact>
                {userInfo.isAuth ? <Redirect exact to="/Discover" /> : <Home />}
              </Route>
              <Route path="/Discover">
                <Discover />
              </Route>
              <Route path="/Search">
                <Search />
              </Route>
              <Route path="/MyList">
                {/* when isAuth directs however to Discover */}
                {userInfo.isAuth ? <MyList /> : <Redirect exact to="/Login" />}
              </Route>
              <Route path="/Login">
                {userInfo.isAuth ? (
                  <Redirect exact to="/Discover" />
                ) : (
                  <Login />
                )}
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
        </Suspense>
      </Router>
    </UserInfoContext.Provider>
  );
}

export { UserInfoContext, ACTIONS, App };
