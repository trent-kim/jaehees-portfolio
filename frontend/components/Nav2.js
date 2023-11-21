import React, { useState, useRef, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";

const Nav = ({ page, setPage }) => {
  const [isHover, setIsHover] = useState(false);
  const pageRef = useRef([]);

  const pages = ["film", "animation", "photography", "info"]
  
  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

useEffect(() => {
if (page != null) {
    pageRef.current[page].style.color = "var(--color-white)"
    pageRef.current[page].style.background = "var(--color-black)"
}
}, [page, pageRef] )


  return (
    <nav className="md:grid md:grid-cols-6 xl:grid-cols-8 fixed items-center z-30 w-full bg-white border-b border-black px-sm py-xs">
      <div className="col-span-1">
        <Link
          href="/"
          className="font-mono text-xs text-black hover:text-red bg-white rounded-[0px] text-center py-[6px]"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => {
            setPage(null);
          }}
        >
          Jaehee Cheong
        </Link>
      </div>
      <div className="flex mt-xs md:mt-[0px]">
        {pages.map((i) => (
            <Link href={`/${i}`} key={i}>
          <button
            ref={(element) => (pageRef.current[i] = element)} 
            onClick={() => {
                setPage(i);
              }}
            className="font-mono text-xs text-black hover:text-white bg-white hover:bg-black border rounded-[0px] border-black text-center px-[10px] py-[6px]"
          >
            {capitalize(i)}
          </button>
        </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
