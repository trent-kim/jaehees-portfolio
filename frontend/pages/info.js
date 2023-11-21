import React, { useState, useEffect, useRef } from "react";
import groq from "groq";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";

import Layout from "@/components/layout";
import Info from "/components/Info";
import Field from "/components/Field";
import Label from "/components/Label";

import useMousePosition from "../hooks/useMousePosition";

const About = ({ about, page, setPage }) => {
  const { x, y } = useMousePosition();

  // thumbnail + project blur
  const thumbnailRef = useRef({});
 console.log("test:", about[0].introduction)
  return (
    <Layout about={about} page={page} setPage={setPage}>
      <div id="projects" className="lg:flex pt-[88px] md:pt-[52px]">
        <div className="flex flex-col w-full lg:w-1/2 px-sm lg:px-[0px] lg:mx-sm py-sm gap-sm border-b lg:border-none">
            
                <div className="flex flex-col items-start gap-xs w-full">
                <div className="items-baseline grid md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 w-full">
                    <Label>About</Label>
                    <div className="font-sans text-xs md:text-sm text-black md:col-span-5 lg:col-span-2 xl:col-span-3">
                        <PortableText
                            value={about[0].introduction}
                            components={ptComponents}
                        />
                        <PortableText
                            value={about[0].bio}
                            components={ptComponents}
                        />
                    </div>
                </div>
                <div className="items-baseline grid md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 w-full">
                    <Label>Contact</Label>
                    <div className="font-sans text-xs md:text-sm text-black md:col-span-5 lg:col-span-2 xl:col-span-3">
                    {about[0].links?.map((link) => (
                        <Link
                        key={link.url}
                        target="_blank"
                        rel="noreferrer"
                        href={link.url}
                        className="hover:text-red"
                        >
                        {link.type}
                        <br></br>
                        </Link>
                    ))}
                    </div>
                </div>
                </div>
                
                
                
            
        </div>
        <div className="flex flex-col w-full lg:w-1/2 pl-sm lg:pl-xs pr-sm py-sm gap-sm">
            <div className="flex flex-col items-start gap-xs w-full">
                <div className="items-baseline grid md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 w-full">
                    <Label>Select Clients +<br></br> Collaborators</Label>
                    <div className="font-sans text-xs md:text-sm text-black md:col-span-5 lg:col-span-2 xl:col-span-3">
                        {about[0].experience?.map((employer) => (
                            <div key={employer.name}>
                                <Link
                                target="_blank"
                                rel="noreferrer"
                                href={employer.url}
                                className="hover:text-red"
                            >
                                {employer.name}
                            </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="items-baseline grid md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 w-full">
                    <Label>Recognition</Label>
                    <div className="font-sans text-xs md:text-sm text-black md:col-span-5 lg:col-span-2 xl:col-span-3">
                    {about[0].recognition?.map((recognizedBy) => (
                        <div key={recognizedBy.name}>
                            {recognizedBy.name}, {recognizedBy.film}, {recognizedBy.year}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="items-baseline grid md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 w-full">
                    <Label>Education</Label>
                    <div className="font-sans text-xs md:text-sm text-black md:col-span-5 lg:col-span-2 xl:col-span-3">
                    {about[0].education?.map((school) => (
                        <div key={school.url}>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href={school.url}
                            className="hover:text-red"
                        >
                            {school.name}
                        </Link>
                        ,&nbsp;
                        <br></br>
                        {school.degree}, {school.year}
                        </div>
                    ))}
                    </div>
                </div>
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
    links[],
    experience[],
    recognition[],
    education[]
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

export default About;
