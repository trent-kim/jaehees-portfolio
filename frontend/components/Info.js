import React from "react";

const Info = ({ children }) => {
  return (
    <div className="flex flex-col items-start gap-sm w-full mr-[0px] sm:mr-xl">
        {children}
    </div>
  );
};

export default Info;