import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "next-sanity";

import Info from "/components/Info";
import Field from "/components/Field";
import Label from "/components/Label";

const ProjectCard = ({
  projects,
  id,
  title,
  slug,
  year,
  categories,
  i,
  thumbnailRef,
  setPage
}) => {
  // thumbnail + project blur
  const projectRef = useRef({});
  const viewProjectRef = useRef({});
  const cardRef = useRef({});

  const setImage = (i) => {
    thumbnailRef.current[i].style.top = "0";
    viewProjectRef.current[i].style.background = "var(--color-black)";
    viewProjectRef.current[i].style.color = "var(--color-white)";
  };

  const resetImage = (i) => {
    thumbnailRef.current[i].style.top = "-100vh";
    viewProjectRef.current[i].style.background = "var(--color-white)";
    viewProjectRef.current[i].style.color = "var(--color-black)";
  };

  const matchPage = (i) => {
    projects[i].categories.map(
      (category) => (
        category === "Film" && setPage("film"),
        category === "Animation" && setPage("animation"),
        category === "Photography" && setPage("photography")
      )
    );
  };

  return (
    <Link
      key={id}
      ref={(element) => (cardRef.current[i] = element)}
      className="last:border-none border-b border-black hover:border-black no-underline"
      href={`/project/${encodeURIComponent(slug.current)}`}
    >
      <li
        ref={(element) => (projectRef.current[i] = element)}
        className="block sm:flex px-sm py-sm gap-sm transition-filter duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        onMouseEnter={() => {
          setImage(i);
        }}
        onMouseLeave={() => {
          resetImage(i);
        }}
        onClick={() => {
          matchPage(i);
        }}
      >
        <Info>
          <Field>
            <Label>Title</Label>
            <h1 className="font-sans text-lg md:text-xl text-black md:col-span-4 xl:col-span-6">{title}</h1>
            
          </Field>
          <Field>
            <Label>Year</Label>
            <h2 className="font-sans text-md md:text-lg text-black md:col-span-4 xl:col-span-6">{year}</h2>
          </Field>
          <Field>
            <Label>Category</Label>
            <h3 className="font-sans text-sm md:text-md text-black flex flex-wrap md:col-span-4 xl:col-span-6">
              {categories.map((category, i) => (
                <div key={category} className="group/item flex">
                  {i >= 1 ? `${category}` : `${category}`}
                  <div className="group-last/item:hidden">&nbsp;/&nbsp;</div>
                </div>
              ))}
            </h3>
          </Field>
        </Info>
        <div className="sm:absolute sm:right-sm">
              <button
                ref={(element) => (viewProjectRef.current[i] = element)}
                className="font-mono text-xs text-black border border-black whitespace-nowrap text-center px-[10px] py-[6px] mt-sm sm:mt-[0px]"
              >
                View Project
              </button>
            </div>
      </li>
    </Link>
  );
};

// sanity client
const client = createClient({
  projectId: "el661cg1",
  dataset: "production",
  apiVersion: "2023-03-16",
  useCdn: true,
});

export default ProjectCard;
