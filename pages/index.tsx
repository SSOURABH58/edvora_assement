import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";

// import { GetServerSideProps } from "next";
// import { useContext } from "react";
// import { AuthCxt, AppContextInterface } from "../store/authCxt";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { credentials } = useContext(AuthCxt) as AppContextInterface;
//   const { data } = await api.post("/login", credentials).catch((err) => err);

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// };

export default function index() {
  // const { authState } = useContext(AuthCxt) as AppContextInterface;
  // const rout = useRouter();
  // useEffect(() => {
  //   !authState && rout.push("/login");
  // }, []);

  return <div className={styles.home} />;
}
