import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/Products.module.scss";
import { useContext } from "react";
import { AuthCxt, AppContextInterface } from "../store/authCxt";

export default function Products(props: any) {
  const { productLable } = props;
  const { products } = props;
  const { filters } = useContext(AuthCxt) as AppContextInterface;
  const [filterdLisr, setfilterdLisr] = useState(products);
  const [selectedProduct, setselectedProduct] = useState(0);

  useEffect(() => {
    let temp = products;

    temp =
      filters.Location !== "All"
        ? temp.filter(
            (ele: any, i: number) => filters.Location === ele.location.state
          )
        : temp;
    temp =
      filters.City !== "All"
        ? temp.filter(
            (ele: any, i: number) => filters.City === ele.location.city
          )
        : temp;

    filters.Date === "Ascending"
      ? temp.sort(function (a: any, b: any) {
          var dateA: any = new Date(a.date),
            dateB: any = new Date(b.date);
          return dateA - dateB;
        })
      : temp.sort(function (a: any, b: any) {
          var dateA: any = new Date(a.date),
            dateB: any = new Date(b.date);
          return dateB - dateA;
        });

    setfilterdLisr(temp);
  }, [products, filters, setfilterdLisr]);
  console.log(productLable, filterdLisr.length);
  return (
    <>
      {filterdLisr.length ? (
        <div className={styles.products}>
          <p className={styles.lable}>{productLable}</p>
          <div className={styles.line} />
          <div className={styles.contaner}>
            <div className={styles.arroLeft}>
              {selectedProduct ? (
                <Image
                  src="/nextArrow.svg"
                  height={33}
                  width={10}
                  onClick={() => setselectedProduct(selectedProduct - 1)}
                ></Image>
              ) : (
                ""
              )}
            </div>
            <div className={styles.array}>
              {filterdLisr.map((ele: any, i: number) => (
                <Product
                  key={i}
                  product={ele}
                  selectedProduct={selectedProduct}
                  index={i}
                  setselectedProduct={setselectedProduct}
                />
              ))}
            </div>
            <div className={styles.arroRight}>
              {selectedProduct !== filterdLisr.length ? (
                <Image
                  src="/nextArrow.svg"
                  height={33}
                  width={10}
                  onClick={() => setselectedProduct(selectedProduct + 1)}
                ></Image>
              ) : (
                ""
              )}
              {/* <Image src="/nextArrow.svg" height={33} width={10}></Image> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function Product({ product, selectedProduct, index, setselectedProduct }: any) {
  const productRef: any = useRef(null);
  useEffect(() => {
    console.log("df");
    if (selectedProduct === index)
      productRef.current && productRef.current.scrollIntoView();
  }, [selectedProduct]);
  return (
    <div
      className={`${styles.product} ${
        selectedProduct === index ? styles.selected : ""
      }`}
      tabIndex={5}
      ref={productRef}
      onMouseOver={() => setselectedProduct(index)}
    >
      <div className={styles.infoTop}>
        <img
          src={product.image ? product.image : "/logo.svg"}
          height={70}
          width={70}
        />
        <div className={styles.infoTopLeft}>
          <p className={styles.productName}>
            {product.name ? product.name : "Product"}
          </p>
          <p className={styles.brandName}>
            {product.brand ? product.brand : "Brand"}
          </p>
          <p className={styles.price}>${product.price}</p>
        </div>
      </div>
      <div className={styles.infoBottum}>
        <div className={styles.infoBottumTop}>
          <p
            className={styles.location}
          >{`${product.location.city}, ${product.location.state}`}</p>
          <p className={styles.date}>{`Date:${product.date}`}</p>
        </div>
        <p className={styles.description}>
          {product.description ? product.description : "Description"}
        </p>
      </div>
    </div>
  );
}
