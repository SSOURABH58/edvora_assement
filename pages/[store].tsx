import React, { useEffect, useState } from "react";
import AboutCompany from "../components/aboutCompany";
import Filter from "../components/filter";
import Products from "../components/products";
import styles from "../styles/Store.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";

const api = axios.create({ baseURL: "https://assessment.api.vweb.app" });

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await api
    .get(`/store?shop_name=${query.store}`)
    .catch((err) => err);
  // console.log(res.data);
  const data = res.data.data;

  let Products = new Set([""]);
  let Location = new Set([""]);
  let City = new Set([""]);
  data.forEach((ele: any) => {
    // console.log(i, "::", ele);
    Products.add(ele[0].category);
    ele.forEach((product: any) => {
      Location.add(product.location.state);
      City.add(product.location.city);
    });
  });

  const filter = {
    Products: ["All", ...[...Products].sort()],
    Location: ["All", ...[...Location].sort()],
    City: ["All", ...[...City].sort()],
  };

  // Pass data to the page via props
  return { props: { data, filter } };
};

export default function Store(props: any) {
  const { data } = props;
  const { filter } = props;
  const [products, setproducts] = useState(data);
  const { filters } = useContext(AuthCxt) as AppContextInterface;

  useEffect(() => {
    let temp = data;
    temp =
      filters.Products !== "All"
        ? temp.filter((ele: any) => filters.Products === ele[0].category)
        : temp;
    setproducts(temp);
  }, [data, filters, setproducts]);

  return (
    <div className={styles.store}>
      {/* {console.log(filters)} */}
      <div className={styles.left}>
        <Filter filterOpctions={filter} />
        <AboutCompany />
      </div>
      <div className={styles.right}>
        <p className={styles.title}>Edvora</p>
        <p className={styles.productlable}>Products</p>
        <div className={styles.products}>
          {products.map((ele: any, i: number) => (
            <Products key={i} productLable={ele[0].category} products={ele} />
          ))}
        </div>
      </div>
    </div>
  );
}
