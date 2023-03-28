// frontend/pages/index.js

import React, { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";

// import Head from "next/head";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import MuxPlayer from "@mux/mux-player-react";
import styles from "@/styles/Home.module.css";
import Layout from "../components/layout";
import { createClient } from "next-sanity";

// import Seo from "../components/Seo";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

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

const Home = ({ projects, about, category, demoReels }) => {
  // console.log(
  //   "projects:",
  //   projects,
  //   "about:",
  //   about,
  //   "category:",
  //   category,
  //   "demo reels:",
  //   demoReels
  // );

  // thumbnail + project blur
  const projectRef = useRef({});
  const thumbnailRef = useRef({});

  const setImage = (i) => {
    // setCurrentProject(i);
    // setIsHover(true);
    if (window.innerWidth > 1000) {
      thumbnailRef.current[i].style.zIndex = 2;
      thumbnailRef.current[i].style.visibility = "visible";
      projectRef.current[i].style.filter = "blur(0px)";
    }
  };

  const resetImage = (i) => {
    // setCurrentProject(null);
    // setIsHover(false);
    if (window.innerWidth > 1000) {
      thumbnailRef.current[i].style.zIndex = 1;
      thumbnailRef.current[i].style.visibility = "hidden";
      projectRef.current[i].style.filter = "blur(10px)";
    }
  };
  // /thumbnail + project blur

  // toggle about
  const bioRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const handleButton = () => {
    setToggle(!toggle);
    // if (window.innerWidth < 1000) {
    //   setToggle(false);
    // }
    toggle
      ? (bioRef.current.style.maxHeight = "0px")
      : (bioRef.current.style.maxHeight = "500px");
  };

  useEffect(() => {
    // console.log(toggle);
  }, [toggle]);
  // /toggle about

  // demo reels
  const demoReelRef = useRef(null);

  const attemptAutoPlay = () => {
    demoReelRef &&
      demoReelRef.current &&
      demoReelRef.current.play().catch((error) => {
        console.error("Error attempting to auto play", error);
      });
  };

  useEffect(() => {
    attemptAutoPlay();
  }, []);

  const { title } = demoReels;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState();

  useEffect(() => {
    setLength(demoReels.length);
  }, [demoReels.length, currentIndex]);

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

  // /demo reels

  // filter
  const categoryRef = useRef({});
  const projectCardRef = useRef({});
  let currentFilter = 0;

  const filterButton = (i) => {
    let match = false;
    currentFilter = i;
    {
      categoryRef.current[i].innerText === "All"
        ? projects.map(
            ({ categories }, l) =>
              (projectCardRef.current[l].style.display = "block")
          )
        : projects.map(({ categories }, l) => (
            // console.log('categories:', categories, 'categoryRef:', categoryRef.current[i].innerText)
            <>
              {categories.map((category) =>
                category === categoryRef.current[i].innerText
                  ? ((projectCardRef.current[l].style.display = "block"),
                    (match = true))
                  : !match && (projectCardRef.current[l].style.display = "none")
              )}
              ;{(match = false)}
            </>
          ));
    }
    toggleFilterButton(i);
  };

  const filterButtonEnter = (i) => {
    categoryRef.current[i].style.background = "var(--color-black)";
    categoryRef.current[i].style.borderColor = "var(--color-black)";
    categoryRef.current[i].style.color = "var(--color-white)";
  };
  const filterButtonLeave = (i) => {
    categoryRef.current[i].style.background = "var(--color-white)";
    categoryRef.current[i].style.borderColor = "var(--color-black)";
    categoryRef.current[i].style.color = "var(--color-black)";
    // keep current filter selected
    categoryRef.current[currentFilter].style.background = "var(--color-black)";
    categoryRef.current[currentFilter].style.borderColor = "var(--color-black)";
    categoryRef.current[currentFilter].style.color = "var(--color-white)";
  };

  const toggleFilterButton = (i) => {
    {
      category.map(
        ({ tag }, l) => (
          (categoryRef.current[l].style.background = "var(--color-white)"),
          (categoryRef.current[l].style.borderColor = "var(--color-black)"),
          (categoryRef.current[l].style.color = "var(--color-black)")
        )
      );
    }
    categoryRef.current[i].style.background = "var(--color-black)";
    categoryRef.current[i].style.borderColor = "var(--color-black)";
    categoryRef.current[i].style.color = "var(--color-white)";
  };
  // /filter

  return (
    <Layout home about={about}>
      {/* intro */}
      <div>
        <div className={styles.left}>
          <div className={styles.about}>
            <div className={styles.info}>
              <div className={styles.field}>
                <div className={styles.label}></div>
                <PortableText
                  value={about[0].introduction}
                  components={ptComponents}
                />
              </div>
              <div className={styles.bio} ref={bioRef}>
                <div className={styles.field}>
                  <div className={styles.label}></div>
                  <div>
                    <PortableText
                      style={{ width: "100%" }}
                      value={about[0].bio}
                      components={ptComponents}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.label}>Links</div>
                  <p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}> </div>
      </div>
      {/* /intro */}

      {/* <div
        className={styles.content}
        style={{ transform: `translateY(${toggle ? "0" : "-350"}px)` }}
      >
        <button
          className={styles.infoButton}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          More Info
        </button> */}
      <div className={styles.content}>
        <div className={styles.field}>
          <div className={styles.label}></div>
          <button
            className={styles.infoButton}
            onClick={() => {
              handleButton();
            }}
          >
            {toggle ? "Less Info" : "More Info"}
          </button>
        </div>
        <div className={styles.demoReelsContainer}>
          <div className={styles.field}>
            <div className={styles.label}>
              Demo Reel {demoReels[currentIndex].title}
              <br></br>
              {currentIndex + 1}/{length}
            </div>
            <Carousel
              infiniteLoop
              showArrows={false}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              renderArrowPrev={(clickHandler) => {
                return (
                  <div className={styles.prevButton} onClick={clickHandler}>
                    <button onClick={prev}>Prev</button>
                  </div>
                );
              }}
              renderArrowNext={(clickHandler) => {
                return (
                  <div className={styles.nextButton} onClick={clickHandler}>
                    <button onClick={next}>Next</button>
                  </div>
                );
              }}
            >
              {demoReels.map(({ playbackId }) => (
                <MuxPlayer
                  playsInline
                  loop
                  muted
                  controls
                  autoPlay
                  key={playbackId}
                  ref={demoReelRef}
                  className={styles.reel}
                  streamType="on-demand"
                  playbackId={playbackId}
                  metadata={{ video_title: title }}
                />
              ))}
            </Carousel>
          </div>
        </div>

        {/* projects */}
        <div id="projects" className={styles.projects}>
          <div className={styles.left}>
            {/* filter */}
            <div className={styles.filter}>
              <div className={styles.field}>
                <div className={styles.label}>Filter</div>
                <div className={styles.tags}>
                  {category.map(({ tag }, i) => (
                    <button
                      key={tag}
                      ref={(element) => (categoryRef.current[i] = element)}
                      className={styles.filterButton}
                      onClick={() => {
                        filterButton(i);
                      }}
                      onMouseEnter={() => {
                        filterButtonEnter(i);
                      }}
                      onMouseLeave={() => {
                        filterButtonLeave(i);
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* /filter */}
            {/* project cards */}
            {projects.length > 0 &&
              projects.map(({ _id, title, slug, year, categories }, i) => (
                <Link
                  key={_id}
                  ref={(element) => (projectCardRef.current[i] = element)}
                  className={styles.previewBorder}
                  href={`/project/${encodeURIComponent(slug.current)}`}
                >
                  <li
                    ref={(element) => (projectRef.current[i] = element)}
                    className={styles.preview}
                    onMouseEnter={() => {
                      setImage(i);
                    }}
                    onMouseLeave={() => {
                      resetImage(i);
                    }}
                  >
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
                          {categories.map((category, i) => (
                            <div key={category} className="inline-block">
                              {" "}
                              {i >= 1 ? `, ${category}` : `${category}`}{" "}
                            </div>
                          ))}
                        </h3>
                      </div>
                      {/* <div className={styles.field}>
                      <div className={styles.label}></div>
                      
                        <button className={styles.button}>
                          <span>See Project</span>
                        </button>
                     
                    </div> */}
                    </div>
                  </li>
                </Link>
              ))}
            {/* /project cards */}
          </div>
          {/* thumbnail */}
          <div className={styles.right}>
            <div className={styles.thumbnailContainer}>
              <div className={styles.thumbnailStack}>
                {projects.map(({ thumbnail }, i) => (
                  <img
                    key={i}
                    ref={(element) => (thumbnailRef.current[i] = element)}
                    className={styles.thumbnail}
                    src={urlFor(thumbnail).url()}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* /thumbnail */}
        </div>
        {/* /projects */}
      </div>
    </Layout>
  );
};

const client = createClient({
  projectId: "el661cg1",
  dataset: "production",
  apiVersion: "2023-03-16",
  useCdn: true,
});

const projectQuery = groq`*[_type == 'project']{
  _id,
  _updatedAt,
  title,
  year,
  slug,
  "categories": categories[]->tag,
  thumbnail,
  images
} | order(_updatedAt asc) | order(year desc)`;

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
  const category = await client.fetch(categoryQuery);
  const demoReels = await client.fetch(demoReelQuery);
  return {
    props: {
      projects,
      about,
      category,
      demoReels,
    },
  };
}

export default Home;
