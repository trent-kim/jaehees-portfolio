import React, { useState, useEffect }  from "react";
import Link from "next/link";

const Footer = ({ about = [] }) => {

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
      setShow(false); 
    } else { // if scroll up show the navbar
      setShow(true);  
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    // cleanup function
    return () => {
       window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div className={`${show ? 'bottom-[0px]' : 'bottom-[-55px]'} transition-bottom duration-500  ease-[cubic-bezier(.23,1,.32,1)] bg-white border-t border-black flex flex-col sm:flex-row sm:fixed w-full z-30`}>
      <div className="w-full sm:w-1/2 px-sm py-xs order-last sm:order-first">
        <div className="font-mono text-xs text-black w-[128px]">
          Copyright &#169; 2023
          <br></br>
          Jaehee Cheong
        </div>
      </div>
      <div className="flex w-full sm:w-1/2 pl-sm sm:pl-xs pr-sm py-xs sm:justify-between">
        <div className="font-mono text-xs text-black flex w-1/2">
          <div>
            {about[0]?.links?.map(
              (link) =>
                link.type === "Email" && (
                  <Link
                    key={link.url}
                    target="_blank"
                    rel="noreferrer"
                    href={link.url}
                  >
                    {link.type}
                    <br></br>
                  </Link>
                )
            )}
            {about[0]?.links?.map(
              (link) =>
                link.type === "Instagram" && (
                  <Link
                    key={link.url}
                    target="_blank"
                    rel="noreferrer"
                    href={link.url}
                  >
                    {link.type}
                  </Link>
                )
            )}
          </div>
        </div>

        <div className="font-mono text-xs pl-xs sm:pl-[0px]">
          <Link target="_blank" rel="noreferrer" href="https://trentkim.space/">
            Site Credit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
