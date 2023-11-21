import React from "react";
import Link from "next/link";

import Info from "@/components/Info";
import Field from "@/components/Field";
import Label from "@/components/Label";
import { useEffect } from "react";

const Footer = ({ about = [] }) => {
  return (
    <div className="bg-white border-t border-black flex flex-col sm:flex-row sm:fixed bottom-[0px] w-full z-30">
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
          <Link target="_blank" rel="noreferrer" href="https://trentkim.com/">
            Site Credit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
