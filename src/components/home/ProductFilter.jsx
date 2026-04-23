import React, { useState } from "react";
// import { products } from "../../data/products";

export default function ProductFilter() {
  return (
    <div className="flex gap-5 flex-row items-center ">
      <div className="grow border p-2 rounded-md  border-gray-200">
        <input placeholder="Filter" className="w-full"></input>
      </div>
      <div className="border rounded-md border-gray-200 ">
        <select
          className="p-1 "
          // value={}
          // onChange={() => }
        >
          <option value="all">All products</option>
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">man's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>
    </div>
  );
}
// const { Filters, setFilters } = useState("all");
// const filteredProducts =
//   Filters === "All"
//     ? productData?.products
//     : productData?.products?.filter((p) => p.category === selectedCategory);
