import React from "react";
import styles from "../styles/InputBox.module.scss";

interface inputBox {
  name: string;
  lable: string;
  placeholder?: string;
  value?: string;
  hendleChange?: any;
  [key: string]: any;
}

export const InputBox = ({
  name,
  lable,
  placeholder = "...",
  value = "",
  hendleChange,
  isDisabled = false,
}: inputBox) => {
  return (
    <div className={styles.inputBox}>
      <p className={styles.lable}>{lable}</p>
      <input
        type="text"
        name={name}
        id={name}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={(e) => hendleChange && hendleChange(e)}
      />
    </div>
  );
};
