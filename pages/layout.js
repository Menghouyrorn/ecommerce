import React, { Children } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Head from "next/head";

const name = "Menghouy Hacker";
export const siteTitle = "Next.js sample website";

const layout = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <Link rel="icon" href="../public/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              property
              src="https://img.freepik.com/free-photo/mand-holding-cup_1258-340.jpg?size=626&ext=jpg&ga=GA1.2.1546389280.1639353600"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  property
                  src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
                  className={utilStyles.borderCircle}
                  width={108}
                  height={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default layout;
