import "../styles/globals.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "./navbar";
import { useRouter } from "next/router";
import Footer from "./footer";
import Search from "./search";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div>
      {router.pathname === "/adminpage" ||
      router.pathname === "/login" ||
      router.pathname === "/signup" ||
      router.pathname === "/forgetPassword" ? (
        <div></div>
      ) : (
        <Navigation />
      )}
      <Component {...pageProps} />
      {router.pathname === "/adminpage" ||
      router.pathname === "/login" ||
      router.pathname === "/signup" ||
      router.pathname === "/forgetPassword" ? (
        <div></div>
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default MyApp;
