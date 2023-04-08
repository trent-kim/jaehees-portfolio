import '../styles/globals.css'
import { Archivo } from "next/font/google";

// Typefaces
const archivo = Archivo({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
    <style jsx global>
        {`
          :root {
            --archivo-font: ${archivo.style.fontFamily};
          }
        `}
      </style>
    <Component {...pageProps} />
    </>
  )
}