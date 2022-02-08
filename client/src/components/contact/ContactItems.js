import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const ContactItems = ({ title, value, icon }) => {
  return (
    <div className="flex bg-white flex-1 mx-4 rounded-lg shadow p-4 space-x-4">
      <div>
        <FontAwesomeIcon icon={icon} className="h-10" />
      </div>
      <div>
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm text-gray-700">{value}</p>
      </div>
    </div>
  );
};
