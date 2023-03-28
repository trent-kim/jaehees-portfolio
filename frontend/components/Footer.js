import groq from "groq";
import React from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";

const Footer = ({ about = [] }) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.info}>
          <div className={styles.field}>
            <div className={styles.label}>Site by</div>
            <p className={styles.h1}>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://trentkim.com/"
              >
                Trent Kim
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.field}>
            <div className={styles.label}>&#169;</div>
            <p className={styles.h1}>Jaehee Cheong 2023</p>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.info}>
          <div className={styles.field}>
            <div className={styles.label}>Contact</div>
            <p>
              {about[0]?.links?.map((link) =>
                link.type !== "Resume" ? (
                  <Link
                    key={link.url}
                    target="_blank"
                    rel="noreferrer"
                    href={link.url}
                  >
                    {link.type}
                    <br></br>
                  </Link>
                ) : (
                  ""
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const client = createClient({
//     projectId: "el661cg1",
//     dataset: "production",
//     apiVersion: "2023-03-16",
//     useCdn: true
// });

// const aboutQuery = groq`*[_type == 'about']{
//     title,
//     introduction,
//     bio,
//     "links": links[]{type, url}
// }`;

// export async function getStaticProps() {
//     const about = await client.fetch(aboutQuery);
//     return {
//         props: {
//         about,
//         },
//     };
// }

export default Footer;
