import React from "react";

const Label = ({ children }) => {
  return (
    <div className="font-mono text-xs text-grey md:flex col-span-1 justify-start pb-xs md:pb-[0px]">
      {children}
    </div>
  );
};

export default Label;
