import React from "react";

const About = () => {
  return (
    <div className="flex flex-col p-10">
      <div className="flex space-x-4 p-4 border">
        <img src="" className="rounded-full border h-24" alt="user-profile" />
        <div className="grid grid-cols-1 border">
          <h1 className="text-lg font-semibold">Aneeq Khurram</h1>
          <p className="text-base text-gray-700">MERN Developer</p>
          <div className="flex space-x-3 justify-evenly">
            <p className="text-sm text-gray-700">aneeqkhurram007</p>

            <p className="text-sm text-gray-700">+923064730660</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3"></div>
    </div>
  );
};

export default About;
