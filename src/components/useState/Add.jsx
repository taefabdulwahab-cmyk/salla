import React from "react";
import { products } from "../../data/products";

export default function Add({ count }) {
  const handlAdd = () => {
    let PID;

    if (PID === products.id) {
      setCount((perv) => perv + 1);
    }
  };
  return (
    <div>
      <p className="bg-red-500 border-0 rounded-full">{count}</p>
      <p onClick={handlAdd}>{PID}</p>
    </div>
  );
}
