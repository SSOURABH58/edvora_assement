import React from "react";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";
// import Image from "next/image";
import styles from "../styles/AboutCompany.module.scss";

export default function AboutCompany() {
  const { company } = useContext(AuthCxt) as AppContextInterface;
  return (
    <div className={styles.about}>
      <p className={styles.title}>{company.name}</p>
      <div className={styles.details}>
        <img
          className={styles.logo}
          src={company.logo_url}
          height={50}
          width={50}
        ></img>
        <p className={styles.text}>{company.contact_address}</p>
      </div>
    </div>
  );
}
