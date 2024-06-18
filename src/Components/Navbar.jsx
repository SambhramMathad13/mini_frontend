import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="flex justify-between items-center mt-0 md:my-8 mx-16 ml-5 font-sans">
      <h1 className="text-gray-800 dark:text-gray-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
        Plac.ed
      </h1>
      {props.isauth ? (
        <div className="no-underline font-medium text-black dark:text-white flex space-x-6 text-base md:text-lg">
          <Link to="/" className="no-underline hover:underline">
            Home
          </Link>
          <Link to="/changepassword" className="no-underline hover:underline">
            ChangePassword
          </Link>
          <Link
            to="/logout"
            className="relative flex items-center justify-center p-1.5 rounded-3xl w-24 sm:w-28 md:w-32 lg:w-36 px-6 mt-1 bg-gray-800 dark:bg-white text-white dark:text-black underline text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="no-underline text-black dark:text-white flex space-x-6 text-base md:text-lg">
          <Link to="/" className="no-underline hover:underline mt-2.5">
            Home
          </Link>
          <Link to="/home" className="no-underline hover:underline mt-2.5">
            Create-Post
          </Link>
          <Link
            to="/login"
            className="relative flex items-center justify-center p-1.5 rounded-3xl w-20 sm:w-28 md:w-32 lg:w-36 px-6 mt-1 bg-gray-800 dark:bg-white text-white dark:text-black underline text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
