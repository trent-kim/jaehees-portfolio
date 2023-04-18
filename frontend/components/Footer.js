import React from "react";
import Link from "next/link";

import Info from "@/components/Info";
import Field from "@/components/Field";
import Label from "@/components/Label";

const Footer = ({ about = [] }) => {
  return (
    <div className="flex absolute w-full px-xs">
      <div className="flex flex-col pt-xl pb-xs gap-sm">
        <Info>
          <Field>
            <Label>Links</Label>
            <p className="font-sans text-sm text-black">
              {about[0]?.links?.map((link) => (
                <Link
                  key={link.url}
                  target="_blank"
                  rel="noreferrer"
                  href={link.url}
                >
                  {link.type}
                  <br></br>
                </Link>
              ))}
            </p>
          </Field>
        </Info>
        <div className="hidden sm:block">
        <Info>
          <Field>
            <Label>Site by</Label>
            <p className="font-sans text-sm text-black">
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://trentkim.com/"
              >
                Trent Kim
              </Link>
            </p>
          </Field>
        </Info>
        </div>
        <Info>
          <Field>
            <Label>Copyright</Label>
            <p className="font-sans text-sm text-black">
              &#169; 2023 Jaehee Cheong
            </p>
          </Field>
        </Info>
      </div>
    </div>
  );
};

export default Footer;
