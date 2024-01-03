import React, { useRef, useEffect} from "react";
import Link from "next/link";

const Nav = ({ page, setPage }) => {
  const pageRef = useRef([]);

  // array of page names
  const pages = ["film", "animation", "photography", "info"]
  
  // capitalize page names for frontend
  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // if page is not null, then change state of the current page's button
  useEffect(() => {
  if (page != null) {
      pageRef.current[page].style.color = "var(--color-white)"
      pageRef.current[page].style.background = "var(--color-black)"
  }
  }, [page, pageRef] )


  return (
    <nav className="md:grid md:grid-cols-6 xl:grid-cols-8 fixed items-center z-30 w-full bg-white border-b border-black px-sm py-xs">
      {/* Home */}
      <div className="col-span-1">
        <Link
          href="/"
          className="font-mono text-xs text-black hover:text-red bg-white rounded-[0px] text-center py-[6px]"
          onClick={() => {
            setPage(null);
          }}
        >
          Jaehee Cheong
        </Link>
      </div>
      {/* / Home */}
      {/* Page Buttons */}
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
      {/* / Page Buttons */}
    </nav>
  );
};

export default Nav;
