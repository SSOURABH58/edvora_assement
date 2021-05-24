import React from "react";
import Image from "next/image";
import styles from "../styles/Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.line} />
      <div className={styles.footerText}>
        <Image src="/cLogoF.svg" height={15} width={185} layout="responsive" />
      </div>
      <div className={styles.line} />
    </footer>
  );
};
