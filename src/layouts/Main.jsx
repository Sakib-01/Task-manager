import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="bg-background">
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="min-h-[calc(100vh)] mt-16  bg-background">
        <Outlet />
      </div>
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Main;
