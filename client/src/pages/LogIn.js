import React, { useState } from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormItem from "../components/common/FormItem";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, navigate);
  const [state, setstate] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;
  const handler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const response = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert(data.message);
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="flex flex-col min-h-screen p-10 space-y-10 justify-center text-center">
      {location.state && (
        <h1 className="text-lg py-4 text-green-400 underline font-semibold underline-offset-4">
          {location.state}
        </h1>
      )}
      <h1 className="text-4xl font-sans">Let's Login to your account</h1>
      <div className="flex justify-center">
        <form
          onSubmit={submitData}
          className="flex flex-col space-y-6 w-1/2 p-10 bg-white rounded-lg shadow-lg"
          autoComplete="off"
        >
          <FormItem
            icon={faEnvelope}
            type="email"
            name="email"
            placeholder="Email"
            changeHandler={handler}
            value={email}
          />
          <FormItem
            icon={faKey}
            type="password"
            name="password"
            changeHandler={handler}
            value={password}
            placeholder="Password"
          />
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="border hover:formBtn rounded-lg p-2 text-lg w-24"
            >
              Login
            </button>
            <p className="inline-block align-middle p-2 text-lg">
              Don't have an account?{" "}
              <Link to="/signup" className="hover:navBtn hover:font-semibold">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
