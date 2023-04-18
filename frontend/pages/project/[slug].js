// ./frontend/pages/project/[slug].js
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
import GreenDivider from "@/components/GreenDivider";
import RedDivider from "@/components/RedDivider";

const Project = ({ project, about = [] }) => {
  return (
    <Layout about={about}>
      <Head>
        <title>{project?.title}</title>
      </Head>
      <div className="flex pt-md pb-lg gap-sm w-full xl:w-1/2">
        <Info>
          <Field>
            <Label>Title</Label>
            <h1 className="font-sans text-xl text-black">{project?.title}</h1>
          </Field>
          <GreenDivider />
          <Field>
            <Label>Year</Label>
            <h2 className="font-sans text-lg text-black">{project?.year}</h2>
          </Field>
          <Field>
            <Label>Category</Label>
            <h3 className="font-sans text-md text-black flex flex-wrap">
              {project?.categories.map((category, i) => (
                <div key={category} className="group/item flex">
                  {i >= 1 ? `${category}` : `${category}`}
                  <div className="group-last/item:hidden">,&nbsp;</div>
                </div>
              ))}
            </h3>
          </Field>
          <RedDivider />
          <Field>
            <Label>Description</Label>
            <div className="font-sans text-sm text-black">
              <PortableText
                value={project?.description}
                components={ptComponents}
              />
            </div>
          </Field>
          {project?.laurels && (
            <Field>
              <Label>Recognition</Label>
              <div className="flex flex-wrap gap-xs items-center">
                {project?.laurels.map((image) => (
                  <Image
                    key={image._key}
                    className="w-[calc((1/4*100%)-10px)] md:w-[calc((1/6*100%)-11px)] lg:w-[calc((1/8*100%)-12px)] xl:w-[calc((1/6*100%)-11px)] h-full"
                    src={urlFor(image).url()}
                    alt="Laurel"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
            </Field>
          )}
        </Info>
      </div>
      {project?.playbackId && (
        <div className="my-sm mx-[0px] sm:mx-xl">
          <MuxPlayer
            controls
            streamType="on-demand"
            playbackId={project?.playbackId}
            // metadata={{ video_title: title }}
          />
        </div>
      )}
      {project?.images &&
        project?.images.map((image) => (
          <div key={image._key} className="my-sm mx-[0px] sm:mx-xl">
            <Image
              className="w-full h-auto"
              src={urlFor(image).url()}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
        ))}
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
  year,
  "categories": categories[]->tag,
  description,
  laurels,
  "playbackId": video.asset->playbackId,
  images
}`;

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
  const about = await client.fetch(aboutQuery, { slug });

  return {
    props: {
      project,
      about,
    },
  };
}

export default Project;
