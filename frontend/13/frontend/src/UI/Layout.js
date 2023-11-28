import React, { Fragment } from "react";

import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

function Layout() {
  return (
    <Fragment>
      <Navbar />
      <main style={{minHeight:"600px",marginTop:"100px"}}>
        <Outlet />
      </main>
      <Footer/>
    </Fragment>
  );
}

export default Layout;
