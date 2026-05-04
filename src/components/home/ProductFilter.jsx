import React, { useState } from "react";
// import { products } from "../../data/products";
import ProductSearch from "./ProductSearch";
export default function ProductFilter({
  Filters,
  setFilters,
  search,
  setSearch,
  category,
  searchData,
}) {
  return (
    <div className="flex gap-5 flex-row items-center ">
      <div className="grow">
        <ProductSearch
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setFilters("");
          }}
          placeholder="Search products..."
        />
        {search && (
          <div>
            {searchData?.products?.map((item, i) => (
              <p key={i} value={item}></p>
            ))}
          </div>
        )}
      </div>

      <div className="border rounded-md border-gray-200 ">
        <select
          className="p-1 "
          value={Filters}
          onChange={(e) => {
            setFilters(e.target.value);
            setSearch("");
          }}
        >
          <option value="">All products</option>
          {category?.map((cat, i) => (
            <option value={cat} key={i}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
