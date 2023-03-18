// const Project = ({ project }) => {
//   return (
//     <>
//     </>
//   )
// }

// export default Project;


// ./frontend/pages/project/[slug].js

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import MuxPlayer from "@mux/mux-player-react";
import { PortableText } from "@portabletext/react";
// import client from "../../client";
import styles from "@/styles/Project.module.css";
import Layout from "../../components/layout";
import Image from "next/image";
import { createClient } from "next-sanity";


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

  return (
    <Layout>
      <article>
        <Head>
          <title>{project?.title}</title>
        </Head>
        <div className={styles.project}>
          <div className={styles.info}>
            <div className={styles.field}>
              <div className={styles.label}>Title</div>
              <h1 className={styles.h1}>{project?.title}</h1>
            </div>
            <div className="divider"></div>
            <div className={styles.field}>
              <div className={styles.label}>Year</div>
              <h2 className={styles.h2}>{project?.year}</h2>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>Category</div>
              <h3>
                {project?.categories.map((category, i) =>
                  <div key={category} className="inline-block"> {i >= 1 ?  `, ${category}` : `${category}` } </div> 
                )}
              </h3>
            </div>
            <div className="divider"></div>
            <div className={styles.field}>
              <div className={styles.label}>Description</div>
              <div className={styles.portableText}>
                <PortableText value={project?.description} components={ptComponents} />
              </div>
            </div>
            {project?.laurels &&
            <div className={styles.field}>
              <div className={styles.label}>Recognition</div>
              <div className={styles.laurelContainer}>
                  {project?.laurels.map((image) => (
                    <img 
                    key={image._key} 
                    className={styles.laurel} 
                    src={urlFor(image).url()} 
                    />
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
        {project?.playbackId &&
        <div className={styles.mediaContainer}>
          <MuxPlayer
            controls
            streamType="on-demand"
            className={styles.reel}
            playbackId={project?.playbackId}
            // metadata={{ video_title: title }}
          />
        </div>
        }
        {project?.images &&
          project?.images.map((image) => (
            <div key={image._key} className={styles.mediaContainer}>
              <img className={styles.image} src={urlFor(image).url()} />
            </div>
          ))}
      </article>
    </Layout>
  );
};


const client = createClient({
  projectId: "el661cg1",
  dataset: "production",
  apiVersion: "2023-03-16",
  useCdn: true
});

const query = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
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
      project
    },
  };
}

export default Project;
