import React from "react";

export default function ErrorMsg({ message }) {
  return (
    <div className="w-full flex items-center justify-center bg-rose-300">
      <span className="text-rose-800">{message}</span>
    </div>
  );
}
