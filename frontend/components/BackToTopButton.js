import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(function onFirstMount() {
    function toggleVisible() {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className="z-20 fixed bottom-xs right-xs font-sans text-xs text-black hover:text-white bg-white hover:bg-black border-2 rounded-[5px] border-black text-center px-[12px] py-[5px]"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      Top
    </button>
  );
};

export default BackToTopButton;
