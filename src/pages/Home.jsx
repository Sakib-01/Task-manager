import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-primary bg-background flex flex-col items-center justify-center min-h-screen overflow-x-hidden">
      {user ? (
        <h2 className="md:text-5xl sm:text-2xl font-semibold">
          Welcome, <span className="text-blue-500">{user.displayName}</span>! 🎉
        </h2>
      ) : (
        <div className="text-center">
          <h2 className="md:text-5xl sm:text-2xl font-semibold">
            Welcome to Task Manager!
          </h2>
          <p className="text-primary mt-2 font-bold">
            Please{" "}
            <Link to="/login" className="text-blue-600 underline">
              login
            </Link>{" "}
            to add a task.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
