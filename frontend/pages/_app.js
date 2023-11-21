import React, { useState } from "react";
import "../styles/globals.css";
import { DM_Sans, DM_Mono } from "next/font/google";

import Seo from "../components/Seo";

// Typefaces
const dmSans = DM_Sans ({
  weight: "500",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const dmMono = DM_Mono ({
  weight: "500",
  style: ["normal", "italic"],
  subsets: ["latin"],
});



export default function App({ Component, pageProps }) {

  const [page, setPage] = useState(null);
  // console.log("Page:", page)

  return (
    <>
      <Seo></Seo>
      <style jsx global>
        {`
          :root {
            --dmSans-font: ${dmSans.style.fontFamily};
            --dmMono-font: ${dmMono.style.fontFamily};
          }
          html {
            background-color: ${"#F8F8F8"};
          }
        `}
      </style>
      <Component page={page} setPage={setPage} {...pageProps} />
    </>
  );
}
