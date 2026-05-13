import React from "react";
import UserIcon from "../../header/UserIcon";
import ProductSearch from "../../home/ProductSearch";
export default function AdminHeader({ search, setSearch }) {
  return (
    <div className=" flex flex-row justify-center items-between w-full bg-gray-200/50 py-4 px-6 gap-5 ">
      <div className="grow">
        <ProductSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        ></ProductSearch>
      </div>

      <UserIcon />
    </div>
  );
}
