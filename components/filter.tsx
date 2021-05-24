import React, { useState } from "react";
import styles from "../styles/Filter.module.scss";
import Image from "next/image";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";
import { useRouter } from "next/dist/client/router";

export default function Filter({ filterOpctions }: any) {
  // console.log(filterOpctions);
  const [filters, setfilters] = useState([
    {
      lable: "Products",
      opctions: [],
    },
    {
      lable: "Location",
      opctions: [],
    },
    {
      lable: "City",
      opctions: [],
    },
  ]);
  const [sorters, setsorters] = useState([
    {
      lable: "Date",
      opctions: ["Ascending", "Descending"],
    },
    {
      lable: "Time",
      opctions: ["Ascending", "Descending"],
    },
  ]);

  return (
    <div className={styles.filter}>
      <p className={styles.lable}>Filters</p>
      <div className={styles.line} />
      {filters.map((ele, i) => (
        <FilterBox
          key={i}
          lable={ele.lable}
          opctions={filterOpctions[ele.lable]}
        />
      ))}
      <div className={styles.gap} />
      <p className={styles.lable}>Sort By</p>
      <div className={styles.line} />
      {sorters.map((ele, i) => (
        <FilterBox key={i} lable={ele.lable} opctions={ele.opctions} />
      ))}
    </div>
  );
}

interface FilterBox {
  lable: string;
  opctions: string[];
}

//
export function FilterBox(props: FilterBox) {
  const [isOpen, setisOpen] = useState(false);
  const { addfilter } = useContext(AuthCxt) as AppContextInterface;

  // console.log(props.opctions);
  return (
    <div
      className={styles.select}
      //   onFocus={() => setisOpen(true)}
      onBlur={() => setisOpen(false)}
      onClick={() => setisOpen(!isOpen)}
      tabIndex={2}
    >
      <p>{props.lable}</p>
      <Image src="/dropDownArrow.svg" width={12} height={12} />
      <div
        className={`${styles.dropdown} ${!isOpen ? styles.displayNone : ""}`}
      >
        {props.opctions.map((ele, i) => (
          <p
            key={i}
            className={styles.element}
            onClick={(e) => addfilter({ [props.lable]: ele })}
          >
            {ele}
          </p>
        ))}
      </div>
    </div>
  );
}
