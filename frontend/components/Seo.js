import React from "react";
import Head from "next/head";

const Seo = () => {
  return (
    <Head>
      <title>Jaehee Cheong</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta property="og:title" content="Jaehee Cheong" />
      <meta name="twitter:title" content="Jaehee Cheong" />
      <meta itemProp="name" content="Jaehee Cheong" />
      <meta name="application-name" content="Jaehee Cheong" />
      <meta name="og:site_name" content="Jaehee Cheong" />
      <link
        rel="icon"
        type="image/png"
        href="https://jaeheecheong.com/favicon.ico"
      />
      <meta property="og:image" href="https://jaeheecheong.com/share.png" />
      <meta
        property="og:image:secure_url"
        content="https://jaeheecheong.com/share.png"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Jaehee Cheong is a filmmaker, animator, and photographer based in Brooklyn, NY."
      />
      <meta
        property="og:description"
        content="Jaehee Cheong is a filmmaker, animator, and photographer based in Brooklyn, NY."
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jaeheecheong.com" />
      <link rel="canonical" href="https://jaeheecheong.com" />
      <meta name="theme-color" content="#F8F8F8" />
      <meta property="og:image:alt" content="Jaehee Cheong" />
      <meta name="robots" content="index,follow" />
    </Head>
  );
};

export default Seo;
