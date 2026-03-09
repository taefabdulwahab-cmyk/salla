import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, type }) {
  return (
    <button
      type={type}
      className=" flex flex-1 justify-center items-center  bg-[#004A57] text-white  rounded-md w-full cursor-pointer "
    >
      {children}
    </button>
  );
}
