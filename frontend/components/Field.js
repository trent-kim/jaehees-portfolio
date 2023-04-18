import React from "react";

const Field = ({ children }) => {
  return (
    <div className="flex gap-[0px] sm:gap-sm items-baseline">
        {children}
    </div>
  );
};

export default Field;