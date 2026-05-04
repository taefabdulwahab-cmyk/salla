import React from "react";

export default function Form({
  children,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="block mb-1 font-normal text-right ">{children}</label>

      <input
        className="border p-2 bg-white w-full rounded-md border-gray-200  "
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
