import React, { useState } from "react";
import Link from "next/link";

const Nav = ({ home }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <nav className="flex fixed justify-between items-center z-20 w-full h-[51px] bg-white">
      <Link
        href="/"
        className="group ml-[12px] relative top-[0] left-[0] flex items-center"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className="inline-block relative top-[0] left-[0] w-[28px] h-[28px] border-solid border-[8px] border-l-transparent border-black rounded-[50%] rotate-[45deg] transition duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
          style={{ transform: `rotate(${isHover ? "45" : "405"}deg)` }}
        ></div>
        <div
          className="inline-block absolute left-[20px] w-[28px] h-[28px] border-[8px] border-r-transparent border-black rounded-full rotate-[0deg] transition duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
          style={{ transform: `rotate(${isHover ? "0" : "-360"}deg)` }}
        ></div>
      </Link>
      {!home && (
        <div className="flex fixed items-center z-30 h-md ml-lg sm:ml-[108px]">
          <Link href="/#projects">
            <button className="font-sans text-xs text-black hover:text-white bg-white hover:bg-black border-2 rounded-[5px] border-black text-center px-[12px] py-[5px]">
              Back
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
