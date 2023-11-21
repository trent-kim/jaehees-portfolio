import React, { useState, useEffect, useRef } from "react";
import groq from "groq";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

import Layout from "@/components/layout";
import ProjectCard from "@/components/ProjectCard";

import useMousePosition from "../hooks/useMousePosition";

const Animation = ({ projects, about, categories, page, setPage }) => {
  const { x, y } = useMousePosition();

  // thumbnail + project blur
  const projectRef = useRef({});
  const thumbnailRef = useRef({});
  const viewProjectRef = useRef({});
  const [currentCategory, setCurrentCategory] = useState(null);

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
    <Layout about={about} page={page} setPage={setPage}>
      <div id="projects" className="pt-[88px] sm:pt-[52px] sm:mb-[52px]">
        <div className="flex flex-col w-full">
          {projects.length > 0 &&
            projects.map(
              ({ _id, title, slug, year, isFeatured, categories }, i) =>
                categories.map(
                  (category) =>
                    category === "Animation" && (
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
        <div
          style={{ left: `calc(${x}px + 42px)`, top: `${y}px` }}
          className="fixed top-md z-40 w-1/3 md:w-1/4 lg:w-1/6 xl:w-[calc((1/8)*100%)] h-full overflow-hidden"
        >
          <div className="relative align-bottom">
            <div className="relative bottom-[100%] left-[0px] "></div>
            {projects.map(({ title, thumbnail, categories }, i) =>
              categories.map(
                (category) =>
                  category === "Animation" && (
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

export default Animation;
