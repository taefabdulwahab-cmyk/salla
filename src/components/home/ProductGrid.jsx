import React from "react";
import ProductCard from "./ProductCard";
import Cart from "../Cart/Cart";
import ProductCardLoading from "./ProductCardLoading";
export default function ProductGrid({
  products,
  productisLoading,
  isFetching,
}) {
  const Array = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch ">
      {(productisLoading || isFetching) &&
        Array.map((_, i) => (
          <div key={i}>
            <ProductCardLoading />
          </div>
        ))}
      {products?.map((data, i) => (
        <ProductCard
          key={i}
          product={data}
          productisLoading={productisLoading}
          isFetching={isFetching}
        />
      ))}
    </div>
  );
}
// (productisLoading || isFetching ? products : products)
// || isFetching ? fakeArray
// const isCardLoading = productisLoading || isFetching || imgLoading;
