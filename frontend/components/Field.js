import React from "react";

const Field = ({ children }) => {
  return (
    <div className="items-baseline grid md:grid-cols-6 xl:grid-cols-8 w-full">
        {children}
    </div>
  );
};

export default Field;