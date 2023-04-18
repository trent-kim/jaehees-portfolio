import React from "react";

const Label = ({ children }) => {
  return (
    <div className="font-sans text-right text-xs text-black min-w-[75px] hidden sm:block">
      {children}
    </div>
  );
};

export default Label;
