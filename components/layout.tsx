import React, { ReactNode, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Layout.module.scss";
import { Footer } from "./footer";
import NavBar from "./navBar";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";
import { useRouter } from "next/dist/client/router";

type Props = {
  children?: ReactNode;
  title?: string;
  [key: string]: any;
};

export default function Layout({ children }: Props) {
  const { authState } = useContext(AuthCxt) as AppContextInterface;

  const { isDark } = useContext(AuthCxt) as AppContextInterface;
  const { pathname, events, push } = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (url !== "/login" && !authState) {
        push("/login");
      }
    };
    if (pathname !== "/login" && !authState) {
      push("/login");
    }
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [authState]);

  return (
    <div className={`${styles.layout} ${!isDark ? styles.light : ""}`}>
      {authState && <NavBar />}
      <div className={styles.right}>
        {children}
        <Footer />
      </div>
    </div>
  );
}
