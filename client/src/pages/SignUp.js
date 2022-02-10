import React, { useState } from "react";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faKey,
  faMobileAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import FormItem from "../components/common/FormItem";
const SignUp = () => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    rpassword: "",
    work: "",
  });
  const { email, name, phone, password, rpassword, work } = state;
  const handler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      alert(data.message);
      navigate("/login", {
        replace: true,
        state: "Signed up successfully. You can login now",
      });
    }
  };
  return (
    <div className="flex flex-col min-h-screen p-10 space-y-10 justify-center text-center">
      <h1 className="text-4xl font-sans">Let's Register you</h1>
      <div className="flex justify-center">
        <form
          onSubmit={submitData}
          className="flex flex-col space-y-6 w-1/2 p-10 bg-white rounded-lg shadow-lg"
          autoComplete="off"
        >
          <FormItem
            icon={faUser}
            type="text"
            changeHandler={handler}
            value={name}
            name="name"
            placeholder="Name"
          />
          <FormItem
            icon={faEnvelope}
            type="email"
            name="email"
            placeholder="Email"
            changeHandler={handler}
            value={email}
          />
          <FormItem
            icon={faMobileAlt}
            type="tel"
            name="phone"
            changeHandler={handler}
            placeholder="Phone"
            value={phone}
          />
          <FormItem
            icon={faPencilAlt}
            type="text"
            name="work"
            changeHandler={handler}
            value={work}
            placeholder="Work"
          />
          <FormItem
            icon={faKey}
            type="password"
            name="password"
            changeHandler={handler}
            value={password}
            placeholder="Password"
          />
          <FormItem
            icon={faKey}
            type="password"
            name="rpassword"
            changeHandler={handler}
            value={rpassword}
            placeholder="Confirm Password"
          />
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="border hover:formBtn rounded-lg p-2 text-lg w-24"
            >
              Signup
            </button>
            <p className="inline-block align-middle p-2 text-lg">
              Already have an account?{" "}
              <Link to="/login" className="hover:navBtn hover:font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
