import "../styles/globals.css";
import { Archivo } from "next/font/google";

import Seo from "../components/Seo";

// Typefaces
const archivo = Archivo({
  weight: "500",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Seo></Seo>
      <style jsx global>
        {`
          :root {
            --archivo-font: ${archivo.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
