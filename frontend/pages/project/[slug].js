// ./frontend/pages/project/[slug].js
import React, { useState, useEffect, useRef } from "react";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import MuxPlayer from "@mux/mux-player-react";
import { PortableText } from "@portabletext/react";
import Layout from "../../components/layout";
import Image from "next/image";
import { createClient } from "next-sanity";

import Info from "@/components/Info";
import Field from "@/components/Field";
import Label from "@/components/Label";
import ProjectNav from "@/components/ProjectNav";

const Project = ({ project, about = [], page, setPage, projects = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const imageRef = useRef({});
  const viewerImageRef = useRef({});
  const viewerRef = useRef();

  // open image viewer + set current index to image clicked
  const openImageViewer = (i) => {
    setIsViewerOpen(true);
    setCurrentIndex(i);
  };

  // set translation for image viewer
  const [translation, setTranslation] = useState("0%");

  useEffect(() => {
    // set length of images
    setLength(project?.images.length);
    if (currentIndex === 0) {
      setTranslation("0%");
    } else {
      setTranslation(`${currentIndex * -100}vw`);
    }
  }, [project?.images.length, currentIndex]);

  // image viewer previous and next
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    } else {
      setCurrentIndex(length - 1);
    }
  };
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // close image viewer
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <Layout about={about} page={page} setPage={setPage}>
      <Head>
        <title>{project?.title}</title>
      </Head>
      {/* Image Viewer */}
      {isViewerOpen && (
        <div
          ref={viewerRef}
          className={`fixed w-full h-full inset-0 border z-40 flex justify-center items-center backdrop-blur-sm animate-fade  
            `}
        >
          {/* Background */}
          <div className="bg-black opacity-[0.97] fixed w-full h-full inset-0"></div>
          {/* / Background */}
          {/* Index */}
          <div className="font-mono text-xs text-white fixed top-sm left-sm z-50">
            {currentIndex + 1} of {project?.images.length}
          </div>
          {/* / Index */}
          {/* Close */}
          <div
            className="font-mono text-xs text-white hover:text-red fixed top-sm right-sm underline hover:cursor-pointer z-50"
            onClick={() => closeImageViewer()}
          >
            Close
          </div>
          {/* / Close */}
          {/* Prev + Next */}
          <div
            onClick={prev}
            className="font-mono text-xs text-white hover:text-red fixed bottom-sm left-sm underline hover:cursor-pointer z-50"
          >
            Prev
          </div>
          <div
            onClick={next}
            className="font-mono text-xs text-white hover:text-red fixed bottom-sm right-sm underline hover:cursor-pointer z-50"
          >
            Next
          </div>
          {/* / Prev + Next */}
          {/* Images */}
          <div className="relative min-w-full min-h-full ">
            <div
              className="absolute transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)] h-full flex"
              style={{
                transform: "translate3d(" + translation + ", 0px, 0px)",
              }}
            >
              {project?.images &&
                project?.images.map((image, i) => (
                  <div
                    className="relative min-w-[100vw] m-h-full flex flex-wrap justify-center p-lg"
                    key={i}
                  >
                    <Image
                      className="w-full h-full object-center object-contain"
                      ref={(element) => (viewerImageRef.current[i] = element)}
                      src={urlFor(image).url()}
                      width={1000}
                      height={1000}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* / Images */}
        </div>
      )}
      {/* / Image Viewer */}

      <div className="mt-[88px] md:mt-[52px] justify-between items-center border-b border-black px-sm py-xs z-[20] w-full bg-white fixed">
        <ProjectNav
          project={project}
          projects={projects}
          currentSlug={project?.slug}
          page={page}
        ></ProjectNav>
      </div>
      <div className="h-[138px] md:h-[113px]"></div>
      {/* Project Info */}
      <div className=" px-sm py-sm gap-sm w-full border-b">
        <div className="w-full">
          <Info>
            <Field>
              <Label>Title</Label>
              <h1 className="font-sans text-lg md:text-xl text-black col-span-4">
                {project?.title}
              </h1>
            </Field>
            <Field>
              <Label>Year</Label>
              <h2 className="font-sans text-md md:text-lg text-black col-span-4">
                {project?.year}
              </h2>
            </Field>
            <Field>
              <Label>Category</Label>
              <h3 className="font-sans text-sm md:text-md text-black flex flex-wrap col-span-4">
                {project?.categories.map((category, i) => (
                  <div key={category} className="group/item flex">
                    {i >= 1 ? `${category}` : `${category}`}
                    <div className="group-last/item:hidden">&nbsp;/&nbsp;</div>
                  </div>
                ))}
              </h3>
            </Field>

            {project?.description && (
              <Field>
                <Label>Description</Label>
                <div className="font-sans text-xs md:text-sm text-black col-span-4">
                  <PortableText
                    value={project?.description}
                    components={ptComponents}
                  />
                </div>
              </Field>
            )}
          </Info>
        </div>
      </div>
      {/* / Project Info */}
      {/* Video */}
      {project?.playbackId && (
        <div className="w-full mb-[-6.5px]">
          <MuxPlayer
            controls
            streamType="on-demand"
            playbackId={project?.playbackId}
            // metadata={{ video_title: title }}
          />
        </div>
      )}
      {/* / Video */}
      {/* Recognition */}
      {project?.laurels && (
        <div>
          {/* Header */}
          <div className="w-full flex px-sm py-xs sticky top-[138px] md:top-[103px] border-y border-black bg-white">
            <div className="font-mono text-xs text-black text-center py-[8px]">
              Recognition
            </div>
          </div>
          {/* / Header */}
          {/* Laurels */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-16 gap-sm p-sm">
            {project?.laurels.map((image) => (
              <div key={image._key} className="col-span-1 flex items-center">
                <Image
                  className="w-full h-auto"
                  src={urlFor(image).url()}
                  alt="Laurel"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
          {/* / Laurels */}
        </div>
      )}
      {/* / Recognition */}
      {/* Images */}
      {/* Header (only for Film + Animation) */}
      {project?.categories.map((category, i) =>
        category === "Film" ? (
          <div
            key={i}
            className="w-full flex px-sm py-xs sticky top-[138px] md:top-[103px] border-y border-black bg-white"
          >
            <div className="font-mono text-xs text-black text-center py-[8px]">
              Stills
            </div>
          </div>
        ) : (
          category === "Animation" && (
            <div
              key={i}
              className="w-full flex px-sm py-xs sticky top-[138px] md:top-[103px] border-y border-black bg-white"
            >
              <div className="font-mono text-xs text-black text-center py-[8px]">
                Stills
              </div>
            </div>
          )
        )
      )}
      {/* / Header (only for Film + Animation) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-sm p-sm">
        {project?.images &&
          project?.images.map((image, i) => (
            <div key={i} className="col-span-1 flex items-start">
              <Image
                className="w-full h-auto cursor-pointer"
                ref={(element) => (imageRef.current[i] = element)}
                src={urlFor(image).url()}
                width={1000}
                height={1000}
                onClick={() => openImageViewer(i)}
                alt=""
              />
            </div>
          ))}
      </div>
      {/* / Images */}
    </Layout>
  );
};

// image url builder
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

// portable text
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
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

// queries
const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  year,
  "categories": categories[]->tag,
  description,
  laurels,
  "playbackId": video.asset->playbackId,
  images
}`;

const projectsQuery = groq`*[_type == 'project']{
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

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "project" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const project = await client.fetch(projectQuery, { slug });
  const projects = await client.fetch(projectsQuery);
  const about = await client.fetch(aboutQuery);

  return {
    props: {
      project,
      projects,
      about,
    },
  };
}

export default Project;

