import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, type, onClick, className }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} flex flex-1 justify-center items-center bg-[#004A57] text-white  rounded-md w-full  p-2`}
    >
      {children}
    </button>
  );
}
