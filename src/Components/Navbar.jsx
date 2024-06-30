import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-between items-center mt-0 md:my-8 mx-16 ml-5 font-sans">
      <h1 className="text-gray-800 dark:text-gray-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
        Plac.ed
      </h1>
      <div className="block md:hidden">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-gray-800 dark:text-gray-100 text-xl" />
        </button>
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute top-16 left-0 right-0 md:relative md:top-0 bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent p-4 md:p-0 z-10`}
      >
        {props.isauth ? (
          <div className="no-underline font-medium text-black dark:text-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-base md:text-lg">
            <Link to="/" className="no-underline hover:underline">
              Home
            </Link>
            <Link to="/changepassword" className="no-underline hover:underline">
              ChangePassword
            </Link>
            <Link
              to="/logout"
              className="relative flex items-center justify-center p-1.5 rounded-3xl w-full md:w-24 sm:w-28 md:w-32 lg:w-36 px-6 mt-1 bg-gray-800 dark:bg-white text-white dark:text-black underline text-sm sm:text-base md:text-lg lg:text-xl"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="no-underline text-black dark:text-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-base md:text-lg">
            <Link to="/" className="no-underline hover:underline mt-2.5 md:mt-0">
              Home
            </Link>
            <Link to="/home" className="no-underline hover:underline mt-2.5 md:mt-0">
              Create-Post
            </Link>
            <Link
              to="/login"
              className="relative flex items-center justify-center p-1.5 rounded-3xl w-full md:w-20 sm:w-28 md:w-32 lg:w-36 px-6 mt-1 bg-gray-800 dark:bg-white text-white dark:text-black underline text-sm sm:text-base md:text-lg lg:text-xl"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
