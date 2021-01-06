import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = (props) => (
  <div className="layout">
    <Navbar />
    <main>{props.children}</main>
    <Footer />
  </div>
);

export default Layout;
