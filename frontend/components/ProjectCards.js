import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

import Info from "/components/Info";
import Field from "/components/Field";
import Label from "/components/Label";
import GreenDivider from "/components/GreenDivider";
import Filter from "/components/Filter";

const ProjectCards = ({ projects, categories }) => {
  // thumbnail + project blur
  const projectRef = useRef({});
  const thumbnailRef = useRef({});
  const [currentCategory, setCurrentCategory] = useState(null);

  const setImage = (i) => {
    // if (window.innerWidth > 1000) {
      thumbnailRef.current[i].style.zIndex = 2;
      thumbnailRef.current[i].style.visibility = "visible";
      projectRef.current[i].style.filter = "blur(0px)";
    // }
  };

  const resetImage = (i) => {
    // if (window.innerWidth > 1000) {
      thumbnailRef.current[i].style.zIndex = 1;
      thumbnailRef.current[i].style.visibility = "hidden";
      projectRef.current[i].style.filter = "blur(10px)";
    // }
  };

  const cardRef = useRef({});

  useEffect(() => {
    let match = false;
    currentCategory !== null &&
      (currentCategory.innerText === "All"
        ? projects.map(({}, l) => (cardRef.current[l].style.display = "block"))
        : projects.map(({ categories }, l) => (
            <>
              {categories.map((category) =>
                category === currentCategory.innerText
                  ? ((cardRef.current[l].style.display = "block"),
                    (match = true))
                  : !match && (cardRef.current[l].style.display = "none")
              )}
              ;{(match = false)}
            </>
          )));
  }, [projects, currentCategory]);

  return (
    <div id="projects" className="flex pt-md">
      <div className="flex flex-col w-full xl:w-1/2">
        <Filter
          categories={categories}
          setCurrentCategory={setCurrentCategory}
        ></Filter>
        {projects.length > 0 &&
          projects.map(({ _id, title, slug, year, categories }, i) => (
            <Link
              key={_id}
              ref={(element) => (cardRef.current[i] = element)}
              className=" border-b-2 border-black hover:border-black no-underline"
              href={`/project/${encodeURIComponent(slug.current)}`}
            >
              <li
                ref={(element) => (projectRef.current[i] = element)}
                className="flex py-md gap-sm blur-none sm:blur-md transition-filter duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                onMouseEnter={() => {
                  setImage(i);
                }}
                onMouseLeave={() => {
                  resetImage(i);
                }}
              >
                <Info>
                  <Field>
                    <Label>Title</Label>
                    <h1 className="font-sans text-xl text-black" style={{overflowWrap: "anywhere"}}>{title}</h1>
                  </Field>
                  <GreenDivider></GreenDivider>
                  <Field>
                    <Label>Year</Label>
                    <h2 className="font-sans text-lg text-black">{year}</h2>
                  </Field>
                  <Field>
                    <Label>Category</Label>
                    <h3 className="font-sans text-md text-black flex flex-wrap">
                      {categories.map((category, i) => (
                        <div key={category} className="group/item flex">
                          {i >= 1 ? `${category}` : `${category}`}
                          <div className="group-last/item:hidden">,&nbsp;</div>
                        </div>
                      ))}
                    </h3>
                  </Field>
                </Info>
              </li>
            </Link>
          ))}
      </div>
      <div className="w-[0px] xl:w-1/2">
        <div className="sticky top-md hidden xl:block">
          <div className="relative top-[0px] left-[0px] mx-xl first:relative">
            {projects.map(({ thumbnail }, i) => (
              <Image
                key={i}
                ref={(element) => (thumbnailRef.current[i] = element)}
                className="absolute top-[0px] left-[0px] w-full pt-sm invisible"
                src={urlFor(thumbnail).url()}
                width={1000}
                height={1000}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// sanity client
const client = createClient({
  projectId: "el661cg1",
  dataset: "production",
  apiVersion: "2023-03-16",
  useCdn: true,
});

// image url builder
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export default ProjectCards;
