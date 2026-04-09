import React from "react";
import { useState } from "react";
import { products } from "../../data/products";
import QuantityControl from "../button/QuantityControl";
import { Link } from "react-router-dom";
export default function CartItem({
  product,

  onAddQuantity,
  onRemoveQuantity,
  onDeleteProduct,
}) {
  return (
    <div>
      <div className="flex flex-row gap-4 justify-between items-center w-full p-4">
        <div className="flex gap-2 flex-row flex-1 items-center  ">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt="product"
              className=" object-cover w-10 "
            />
          </Link>
          <div className="flex flex-col gap-1 w-fit">
            <h1 className="w-fit text-base">{product.title}</h1>

            <div className="flex flex-row gap-2 items-center ">
              <p className="font-bold 1tr">X{product.quantity}</p>
              <span className=" font-medium text-xs text-gray-500 ">
                SAR&nbsp;{product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 ">
          <QuantityControl
            value={product.quantity}
            onIncrease={() => onAddQuantity(product.id)}
            onDecrease={() => onRemoveQuantity(product.id)}
          />
          <img
            className="w-7 p-1 rounded-full border-2 border-red-600"
            src="https://www.svgrepo.com/show/494116/garbage-can.svg"
            alt="delete"
            onClick={(e) => {
              e.preventDefault();
              onDeleteProduct(product.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
