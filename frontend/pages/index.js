// frontend/pages/index.js
import React, { useState, useRef } from "react";
import Link from "next/link";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { createClient } from "next-sanity";

import Layout from "../components/layout";
import Field from "../components/Field";
import Label from "../components/Label";
import DemoReels from "../components/DemoReels2";
import FeaturedWork from "../components/FeaturedWork";

const Home = ({ projects, about, categories, demoReels, page, setPage }) => {
  // toggle about
  const bioRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const handleButton = () => {
    setToggle(!toggle);

    toggle
      ? (bioRef.current.style.maxHeight = "0px")
      : (bioRef.current.style.maxHeight = "800px");
  };

  return (
    <Layout home about={about} page={page} setPage={setPage}>
      {/* intro */}
      {/* <div>
        <div className="flex flex-col w-full xl:w-1/2 ">
          <div className="flex pt-[61px] gap-sm">
            <div className="flex flex-col items-start gap-sm w-full mr-[0px] sm:mr-[96px]">
              <Field>
                <Label></Label>
                <div className="font-sans text-sm text-black">
                  <PortableText
                    value={about[0].introduction}
                    components={ptComponents}
                  />
                </div>
              </Field>
              <div
                className="flex flex-col gap-sm max-h-[0px] transition-max-h ease-in-out duration-[0.25s]"
                ref={bioRef}
              >
                <Field>
                  <Label></Label>
                  <div className="font-sans text-sm text-black">
                    <PortableText
                      value={about[0].bio}
                      components={ptComponents}
                    />
                  </div>
                </Field>
                <Field>
                  <Label>Links</Label>
                  <p className="font-sans text-sm text-black pb-sm">
                    {about[0].links.map((link) => (
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
              </div>
            </div>
          </div>
        </div>
        <div className="w-[0px] xl:w-1/2"></div>
      </div> */}
      {/* /intro */}

      {/* <div className="relative bg-white"> */}
        {/* <Field>
          <Label></Label>
          <button
            className="font-sans text-xs text-black hover:text-white bg-white hover:bg-black border-2 rounded-[5px] border-black text-center px-[12px] py-[5px]"
            onClick={() => {
              handleButton();
            }}
          >
            {toggle ? "Less Info" : "More Info"}
          </button>
        </Field> */}
        <DemoReels demoReels={demoReels}></DemoReels>
        <FeaturedWork
          projects={projects}
          categories={categories}
          setPage={setPage}
        ></FeaturedWork>
      {/* </div> */}
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

const demoReelQuery = groq`*[_type == 'demoReel']{
  title,
  "playbackId": video.asset->playbackId
}`;

export async function getStaticProps() {
  const projects = await client.fetch(projectQuery);
  const about = await client.fetch(aboutQuery);
  const categories = await client.fetch(categoryQuery);
  const demoReels = await client.fetch(demoReelQuery);
  return {
    props: {
      projects,
      about,
      categories,
      demoReels,
    },
  };
}

export default Home;
