import React from "react";
import { products } from "../../data/products";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

import SingleCard from "../product/SingleCard";

export default function ProductCard({ product }) {
  return (
    <div className=" flex flex-col bg-white rounded-lg  items-center md:p-3 p-2   shadow-md  h-fit ">
      <div className=" flex  justify-center rounded-lg mb-2  ">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt="product"
            className=" object-contain w-full h-50 "
          />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-start gap-2 w-full  ">
        <div className="flex flex-col items-center justify-center gap-1 text-center w-full h-28">
          <h2>{product.title}</h2>
          <small>{product.shortDescription}</small>
        </div>

        <div className="underline">
          <small>{product.category}</small>
        </div>
      </div>

      <div className="flex justify-center items-center w-full ">
        <div className=" m-4 text-md">
          <p className="font-bold">SAR&nbsp;{product.price.toFixed(2)}</p>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
