import React from "react";
import { Footer } from "../components/footer";
import LoginTab from "../components/loginTab";
import styles from "../styles/Login.module.scss";

export default function login() {
  return (
    <div className={styles.login}>
      <main className={styles.main}>
        <LoginTab />
      </main>
    </div>
  );
}
