import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHouseLaptop, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import FormItem from "../components/common/FormItem";
import { ContactItems } from "../components/contact/ContactItems";

const Contact = () => {
  const [state, setstate] = useState({
    email: "",
    name: "",
    phone: "",
    message: "",
  });
  const { email, name, phone, message } = state;
  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const getData = async () => {
    try {
      const response = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setstate({
        ...state,
        email: data.email,
        phone: data.phone,
        name: data.name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => getData(), []);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) throw new Error(data.error);
      alert(data.message);
      setstate({ ...state, message: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col py-10 min-h-screen">
      <div className="flex justify-center p-4">
        <ContactItems
          title={"Phone"}
          value={"+923064730660"}
          icon={faMobileAlt}
        />
        <ContactItems
          title={"Email"}
          value={"aneeqkhurram007"}
          icon={faEnvelope}
        />
        <ContactItems
          title={"Address"}
          value={"127.0.0.0"}
          icon={faHouseLaptop}
        />
      </div>
      <div className="p-10 flex justify-center">
        <div className="shadow-lg bg-white rounded-lg p-4 text-center">
          <h1 className="text-4xl font-sans py-4">Get in Touch</h1>
          <form
            autoComplete="off"
            onSubmit={submitHandler}
            className="grid grid-cols-3 my-5"
          >
            <FormItem
              name={"name"}
              type="text"
              placeholder={"Your Name"}
              icon={faUser}
              value={name}
              changeHandler={handleChange}
            />
            <FormItem
              name={"email"}
              type="email"
              placeholder={"Your Email"}
              icon={faEnvelope}
              value={email}
              changeHandler={handleChange}
            />
            <FormItem
              name={"phone"}
              type="tel"
              placeholder={"Your Phone Number"}
              icon={faMobileAlt}
              value={phone}
              changeHandler={handleChange}
            />
            <textarea
              rows="5"
              className="outline-none p-2
              rounded focus-within:font-semibold col-span-3 m-5 border"
              cols="5"
              name="message"
              value={message}
              onChange={handleChange}
              placeholder="Message"
            />
            <button
              type="submit"
              className="border mx-5 hover:formBtn rounded-lg p-2 text-lg w-24"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
