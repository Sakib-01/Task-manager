import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="min-h-[calc(100vh-306px)] mt-16">
        <Outlet />
      </div>
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Main;
