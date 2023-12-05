import React, { useRef } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

import ProjectCard from "./ProjectCard";

import useMousePosition from "../hooks/useMousePosition";

const FeaturedWork = ({ projects, setPage }) => {
  // mouse position used for thumbnails
  const { x, y } = useMousePosition();

  // thumbnail refs
  const thumbnailRef = useRef({});

  return (
    <div id="projects" className="mt-[-6.5px] sm:mb-[52px]">
      {/* Header */}
      <div className="w-full flex px-sm py-xs sticky top-[88px] md:top-[52px] border-y border-black bg-white z-20">
        <div className="font-mono text-xs text-black text-center py-[8px]">
          Featured Work
        </div>
      </div>
      {/* / Header */}
      {/* Project Cards */}
      <div className="flex flex-col w-full">
        {projects.length > 0 &&
          projects.map(
            ({ _id, title, slug, year, isFeatured, categories }, i) =>
              isFeatured && (
                <ProjectCard
                  key={_id}
                  projects={projects}
                  id={_id}
                  title={title}
                  slug={slug}
                  year={year}
                  categories={categories}
                  i={i}
                  thumbnailRef={thumbnailRef}
                  setPage={setPage}
                ></ProjectCard>
              )
          )}
      </div>
      {/* / Project Cards */}
      {/* Thumbnails */}
      <div
        style={{ left: `calc(${x}px + 48px)`, top: `${y}px` }}
        className="fixed top-md z-40 w-1/3 md:w-1/4 lg:w-1/6 xl:w-[calc((1/8)*100%)] h-full overflow-hidden"
      >
        <div className="relative align-bottom">
          <div className="relative bottom-[100%] left-[0px] "></div>
          {projects.map(
            ({ thumbnail, isFeatured }, i) =>
              isFeatured && (
                <Image
                  key={i}
                  ref={(element) => (thumbnailRef.current[i] = element)}
                  className="absolute top-[-100vh] left-[0px] w-full transition-top ease-in-out duration-[0.25s]"
                  src={urlFor(thumbnail).url()}
                  width={1000}
                  height={1000}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  alt=""
                />
              )
          )}
        </div>
      </div>
      {/* / Thumbnails */}
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

export default FeaturedWork;
