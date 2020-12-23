import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = (props) => (
  <>
    <Navbar />
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Layout;
