import React, { useState } from "react";
import { InputBox } from "./inputBox";
import styles from "../styles/Login.module.scss";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";

const inputFields = [
  {
    name: "company_id",
    lable: "Company ID",
    placeholder: "Company ID",
  },
  {
    name: "access_key",
    lable: "Access Key",
    placeholder: "Access Key",
  },
];

interface localState {
  company_id?: string;
  access_key?: string;
  [key: string]: any;
}

const LoginTab = () => {
  const [localState, setlocalState] = useState<localState>({});
  const { login } = useContext(AuthCxt) as AppContextInterface;

  const heandleChange = (e: any) => {
    setlocalState({ ...localState, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.loginTab}>
      <p className={styles.title}>Login</p>
      {inputFields.map((val, i) => (
        <InputBox
          key={i}
          name={val.name}
          lable={val.lable}
          placeholder={val.placeholder}
          hendleChange={heandleChange}
          value={localState[val.name]}
        />
      ))}

      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          login({
            company_id: localState.company_id,
            access_key: localState.access_key,
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginTab;
