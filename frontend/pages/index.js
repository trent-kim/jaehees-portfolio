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
