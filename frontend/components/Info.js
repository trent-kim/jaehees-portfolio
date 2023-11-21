import React from "react";

const Info = ({ children }) => {
  return (
    <div className="flex flex-col items-start gap-xs w-full">
        {children}
    </div>
  );
};

export default Info;