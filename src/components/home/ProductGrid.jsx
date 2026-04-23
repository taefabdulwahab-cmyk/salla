import React from "react";
import ProductCard from "./ProductCard";
import Cart from "../Cart/Cart";
export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch ">
      {products?.map((data, i) => (
        <ProductCard key={i} product={data} />
      ))}
    </div>
  );
}
