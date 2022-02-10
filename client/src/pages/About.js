import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  const [state, setstate] = useState({});
  const callAboutPage = async () => {
    try {
      const response = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        throw new Error("Failed to fetch data");
      }
      setstate(data);
    } catch (error) {
      console.log(error);
      navigate("/login", { replace: true });
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <div className="flex flex-col p-10">
      <div className="flex space-x-4 p-4 border">
        <img src="" className="rounded-full border h-24" alt="user-profile" />
        <div className="grid grid-cols-1 border">
          <h1 className="text-lg font-semibold">{state.name}</h1>
          <p className="text-base text-gray-700">{state.work}</p>
          <div className="flex space-x-3 justify-ev}enly">
            <p className="text-sm text-gray-700">{state.email}</p>

            <p className="text-sm text-gray-700">{state.phone}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3"></div>
    </div>
  );
};

export default About;
