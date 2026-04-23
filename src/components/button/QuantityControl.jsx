import React from "react";

export default function QuantityControl({ value, onIncrease, onDecrease }) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-2 flex ">
      <button
        className="px-2 text-md text-gray-500 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          onIncrease();
        }}
      >
        +
      </button>
      <input
        className="text-black w-12 text-center"
        readOnly={true}
        value={value || 1}
      ></input>
      <button
        className="px-2 text-md text-gray-500 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          onDecrease();
        }}
      >
        -
      </button>
    </div>
  );
}
