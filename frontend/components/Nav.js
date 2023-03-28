import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Nav.module.css";

const Nav = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <nav>
      <Link
        href="/"
        className={styles.logo}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={styles.jCircle}
          style={{ transform: `rotate(${isHover ? "45" : "405"}deg)` }}
        ></div>
        <div
          className={styles.cCircle}
          style={{ transform: `rotate(${isHover ? "0" : "-360"}deg)` }}
        ></div>
      </Link>
    </nav>
  );
};

export default Nav;
