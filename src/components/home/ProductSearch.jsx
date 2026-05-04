import React, { Children } from "react";

export default function ProductSearch({ value, onChange, placeholder }) {
  return (
    <div className="grow border p-2 rounded-md  border-gray-200">
      <input
        placeholder={placeholder}
        className="w-full"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
}
