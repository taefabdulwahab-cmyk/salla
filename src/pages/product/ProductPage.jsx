import React, { useEffect, useState } from "react";
import SingleProduct from "../../components/product/SingleProduct";

export default function ProductPage() {
  // const [data, setData] = useState([]);
  // const wait = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(SingleProduct);
  //   }, 4000);
  // });
  return (
    <div>
      <SingleProduct />
    </div>
  );
}
