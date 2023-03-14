// ./frontend/pages/project/[slug].js

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react";
import { PortableText } from "@portabletext/react";
import client from "../../client";
import styles from "@/styles/Project.module.css";
import Layout from "../../components/layout";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

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

const Project = ({ project }) => {
  const {
    title = "Missing title",
    year = "Missing year",
    categories,
    description = [],
    laurels,
    playbackId,
    images,
  } = project;

  return (
    <Layout>
      <article>
        <Head>
          <title>{title}</title>
        </Head>
        <div className={styles.project}>
          <div className={styles.info}>
            <div className={styles.field}>
              <div className={styles.label}>Title</div>
              <h1 className={styles.h1}>{title}</h1>
            </div>
            <div className="divider"></div>
            <div className={styles.field}>
              <div className={styles.label}>Year</div>
              <h2 className={styles.h2}>{year}</h2>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>Category</div>
              <h3>
                {categories.map((category, i) =>
                  i >= 1 ? <>, {category}</> : <>{category}</>
                )}
              </h3>
            </div>
            <div className="divider"></div>
            <div className={styles.field}>
              <div className={styles.label}>Description</div>
              <div className={styles.portableText}>
                <PortableText value={description} components={ptComponents} />
              </div>
            </div>
            {laurels &&
            <div className={styles.field}>
              <div className={styles.label}>Recognition</div>
              <div className={styles.laurelContainer}>
                  {laurels.map((image) => (
                    <img className={styles.laurel} src={urlFor(image).url()} />
                  ))}
              </div>
            </div>
            }

            {/* <div className={styles.field}>
              <div className={styles.label}></div>
              <div className={styles.buttons}>
                <Link href={``}>
                  <button className={styles.button}>
                    <span>Prev</span>
                  </button>
                </Link>{" "}
                <Link href={``}>
                  <button className={styles.button}>
                    <span>Next</span>
                  </button>
                </Link>{" "}
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.mediaContainer}>
          <MuxPlayer
            controls
            className={styles.reel}
            playbackId={playbackId}
            metadata={{ video_title: title }}
          />
        </div>
        {images &&
          images.map((image) => (
            <div className={styles.mediaContainer}>
              <img className={styles.image} src={urlFor(image).url()} />
            </div>
          ))}
      </article>
    </Layout>
  );
};

const query = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  year,
  "categories": categories[]->tag,
  description,
  laurels,
  "playbackId": video.asset->playbackId,
  images
}`;

// const queryAll = groq`*[_type == 'project']`;

// const currentPostIndex = projects.findIndex(project => project.slug === currentPost.slug);
// const previousPost = projects[currentPostIndex - 1];
// const nextPost = projects[currentPostIndex + 1];

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
  const project = await client.fetch(query, { slug });

  return {
    props: {
      project,
    },
  };
}

export default Project;
