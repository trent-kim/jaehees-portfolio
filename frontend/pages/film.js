import React, { useRef } from "react";
import groq from "groq";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

import Layout from "@/components/layout";
import ProjectCard from "@/components/ProjectCard";

import useMousePosition from "../hooks/useMousePosition";

const Film = ({ projects, about, page, setPage }) => {
  // mouse position used for thumbnails
  const { x, y } = useMousePosition();

  // thumbnail refs
  const thumbnailRef = useRef({});

  return (
    <Layout about={about} page={page} setPage={setPage}>
      <div className=" pt-[88px] sm:pt-[52px]">
        {/* Project Cards */}
        <div className="flex flex-col w-full">
          {projects.length > 0 &&
            projects.map(({ _id, title, slug, year, categories }, i) =>
              categories.map(
                (category) =>
                  category === "Film" && (
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
              )
            )}
        </div>
        {/* / Project Cards */}
        {/* Thumbnails */}
        <div
          style={{ left: `calc(${x}px + 42px)`, top: `${y}px` }}
          className="fixed top-md z-40 w-1/3 md:w-1/4 lg:w-1/6 xl:w-[calc((1/8)*100%)] h-full overflow-hidden"
        >
          <div className="relative align-bottom">
            <div className="relative bottom-[100%] left-[0px]"></div>
            {projects.map(({ thumbnail, categories }, i) =>
              categories.map(
                (category) =>
                  category === "Film" && (
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
              )
            )}
          </div>
        </div>
        {/* / Thumbnails */}
      </div>
    </Layout>
  );
};

// portable text
const ptComponents = {
  types: {
    image: ({ value, isInline }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
          style={{ display: isInline ? "inline-block" : "block" }}
        />
      );
    },
  },
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

// queries
const projectQuery = groq`*[_type == 'project']{
    _id,
    _updatedAt,
    title,
    year,
    date,
    slug,
    isFeatured,
    "categories": categories[]->tag,
    thumbnail,
    images
  } | order(date desc)`;

const aboutQuery = groq`*[_type == 'about']{
    title,
    introduction,
    bio,
    "links": links[]{type, url}
  }`;

const categoryQuery = groq`*[_type == 'category']{
    tag,
    orderNumber
  } | order(orderNumber asc)`;

export async function getStaticProps() {
  const projects = await client.fetch(projectQuery);
  const about = await client.fetch(aboutQuery);
  const categories = await client.fetch(categoryQuery);
  return {
    props: {
      projects,
      about,
      categories,
    },
  };
}

export default Film;
