import React from "react";
import { InputBox } from "../components/inputBox";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";
import styles from "../styles/Profile.module.scss";

const profileFields = [
  {
    name: "name",
    lable: "Username",
    placeholder: "Username",
  },
  {
    name: "email",
    lable: "Email Address",
    placeholder: "Email Address",
  },
  {
    name: "mobile_number",
    lable: "Mobile Number",
    placeholder: "Mobile Number",
  },
];

export default function Profile() {
  const { user } = useContext(AuthCxt) as AppContextInterface;

  return (
    <div className={styles.profile}>
      <div className={styles.contaner}>
        <div className={styles.details}>
          {profileFields.map((val, i) => (
            <InputBox
              key={i}
              name={val.name}
              lable={val.lable}
              placeholder={val.placeholder}
              value={user[val.name]}
            />
          ))}
        </div>
        <div className={styles.identy}>
          <div className={styles.profileImg}>
            {user.name ? user.name[0] : "U"}
          </div>
          <div className={styles.profileName}>{user.name}</div>
        </div>
      </div>
    </div>
  );
}
