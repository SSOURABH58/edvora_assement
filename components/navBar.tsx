import React, { useState } from "react";
import styles from "../styles/NavBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";

export default function NavBar() {
  const { user } = useContext(AuthCxt) as AppContextInterface;
  const { shops } = useContext(AuthCxt) as AppContextInterface;
  const [selected, setselected] = useState(0);
  const { switchDark } = useContext(AuthCxt) as AppContextInterface;

  return (
    <div className={styles.navBar}>
      <Image
        className={styles.logo}
        src="/logo.svg"
        width={41}
        height={41}
        onClick={() => switchDark()}
      />
      <div className={styles.line} />
      <div className={styles.shops}>
        {shops.map((val: any, i: number) => (
          <Link key={i} href={`/${val.shop_name}`} passHref>
            <a onClick={() => setselected(i)}>
              <div
                className={`${styles.shop} ${
                  selected === i ? styles.activeShop : ""
                } `}
              >
                {val.shop_name[0]}
              </div>
            </a>
          </Link>
        ))}
      </div>
      <Link href="/profile" passHref>
        <a className={styles.profileT}>
          {user.name[0]}
          {/* <Image
            className={styles.profile}
            src="/logo.svg"
            width={41}
            height={41}
          /> */}
        </a>
      </Link>
    </div>
  );
}
