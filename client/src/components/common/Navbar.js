import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
const Navbar = () => {
  return (
    <>
      <nav className="z-50 bg-white opacity-95 shadow-md py-1 px-10 top-0 sticky flex justify-between">
        {/* Image Div */}
        <div className="flex space-x-4">
          <FontAwesomeIcon
            icon={faReact}
            className="h-16 text-cyan-400 hover:rotate-90 hover:transition-all"
          />
          <span className="inline-block align-middle font-semibold text-2xl py-4">
            MERN LEARN
          </span>
        </div>
        {/* Links Div */}
        <div className="flex justify-evenly text-lg font-semibold space-x-4 py-5">
          <Link className="hover:navBtn" to={"/"}>
            Home
          </Link>
          <Link className="hover:navBtn" to={"/about"}>
            About
          </Link>
          <Link className="hover:navBtn" to={"/contact"}>
            Contact
          </Link>
          <Link className="hover:navBtn" to={"/login"}>
            Login
          </Link>
          <Link className="hover:navBtn" to={"/signup"}>
            Signup
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
