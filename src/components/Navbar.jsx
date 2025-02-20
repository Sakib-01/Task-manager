import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { BsMoon, BsSun } from "react-icons/bs";

// import menuIcon from "../assets/menu_icon.png";
import menuIcon from "../assets/img/menu_icon.png";
import crossIcon from "../assets/img/cross_icon.svg";
import logo from "../assets/img/logo.webp";
import { ThemeContext } from "../providers/ThemeProvider";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out!");
    }
  };

  return (
    <nav className="bg-background shadow-md fixed top-0 left-0 w-full z-50">
      <div className="w-11/12 mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img className="w-12" src={logo} alt="Logo" />
          <Link to="/" className="text-2xl font-bold text-primary">
            Task Manager
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-primary transition ${
                isActive ? "text-primary" : "text-blue-700"
              }`
            }
          >
            Home
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/myTask"
                className={({ isActive }) =>
                  `hover:text-primary transition ${
                    isActive ? "text-primary" : "text-blue-700"
                  }`
                }
              >
                My Task
              </NavLink>
              <NavLink
                to="/addTask"
                className={({ isActive }) =>
                  `hover:text-primary transition ${
                    isActive ? "text-primary" : "text-blue-700"
                  }`
                }
              >
                Add Task
              </NavLink>
            </>
          )}
        </ul>

        {/* Authentication & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="">
                <img
                  className="w-10 h-10  rounded-full"
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="User"
                  title={user?.displayName}
                />
              </div>
              <button
                onClick={handleLogout}
                className="btn bg-primary btn-sm text-white hover:text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="btn btn-outline  btn-sm border-primary text-primary"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn bg-primary btn-sm text-white hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="focus:outline-none text-lg p-2 rounded-full bg-primary"
          >
            {isDarkMode ? (
              <BsSun className="text-yellow-300" />
            ) : (
              <BsMoon className="text-white" />
            )}
          </button>

          <button
            onClick={() => setShowMobileMenu(true)}
            className="lg:hidden text-primary"
          >
            <img
              src={menuIcon}
              alt="Menu Icon"
              className="w-8 bg-slate-100 rounded-md"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
          showMobileMenu ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setShowMobileMenu(false)}>
            <img src={crossIcon} alt="Close Menu" className="w-6" />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-6 mt-6 text-lg font-medium">
          <NavLink
            to="/"
            onClick={() => setShowMobileMenu(false)}
            className="btn bg-secondary btn-block text-text hover:text-black"
          >
            Home
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/myTask"
                onClick={() => setShowMobileMenu(false)}
                className="btn bg-secondary btn-block text-text hover:text-black"
              >
                My Task
              </NavLink>
              <NavLink
                to="/addTask"
                onClick={() => setShowMobileMenu(false)}
                className="btn bg-secondary btn-block text-text hover:text-black"
              >
                Add Task
              </NavLink>
            </>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
              className="btn bg-secondary btn-block text-text hover:text-black"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setShowMobileMenu(false)}
              className="btn bg-primary btn-block text-text hover:text-black"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
