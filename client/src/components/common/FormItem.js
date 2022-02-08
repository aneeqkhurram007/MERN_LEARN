import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const FormItem = ({ type, name, placeholder, icon, changeHandler, value }) => {
  return (
    <div className="flex mx-5 focus-within:text-cyan-400 space-x-4 text-lg border-b p-2 border-black">
      <label htmlFor={name}>
        <FontAwesomeIcon icon={icon} />
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required
        onChange={changeHandler}
        autoComplete="off"
        className="w-3/4 outline-none border-none rounded focus-within:font-semibold"
      />
    </div>
  );
};

export default FormItem;
