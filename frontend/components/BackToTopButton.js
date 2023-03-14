import React, { useState, useEffect } from "react";
import styles from "@/styles/BackToTopButton.module.css";

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
      className={styles.backToTop}
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      Back to Top
    </button>
  );
};

export default BackToTopButton;
