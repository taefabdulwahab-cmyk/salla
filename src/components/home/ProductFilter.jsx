import React, { useState } from "react";
import { products } from "../../data/products";

export default function ProductFilter() {
  return (
    <div className="flex gap-5 flex-row items-center ">
      <div className="grow border p-2 rounded-md  border-gray-200">
        <input placeholder="Filter" className="w-full"></input>
      </div>
      <div className="border rounded-md border-gray-200 ">
        <select className="p-1 " onClick={() => {}}>
          <option>All products</option>
          <option>electronics</option>
          <option>jewelery</option>
          <option>man's clothing</option>
          <option>women's clothing</option>
        </select>
      </div>
    </div>
  );
}
