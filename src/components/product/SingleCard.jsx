import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import QuantityControl from "../button/QuantityControl";
export default function SingleCard({ data, onAddQuantity, onRemoveQuantity }) {
  return (
    <div className="flex grow  flex-wrap  w-full ">
      <div className="flex-auto  max-w-293 mx-auto ">
        <div className=" flex flex-row  gap-4  p-4 bg-[#ffffff] shadow-xs rounded-lg text-white">
          <div className="flex  items-start w-92  ">
            <img
              src={data.image}
              alt="product imgae"
              className="h-70 w-full object-cover rounded-lg mb-2 "
            />
          </div>
          <div className=" flex flex-col flex-1 gap-4 ">
            <div className="flex  items-end  text-right flex-col ">
              <h1 className="text-3xl text-black mb-2">{data.title}</h1>
              <small className="text-gray-500 font-light text-xs">
                {data.shortDescription}
              </small>
              <p className="text-black text-[20px] font-medium  mt-6 mb-4 text-left w-full">
                SAR&nbsp;{data.price.toFixed(2)}
              </p>
              <p className="text-black indent-8 text-base/6 font[100] text-[14px] ">
                {data.description}
              </p>
            </div>
            <div className="flex w-full  gap-4 mt-auto">
              <QuantityControl
                value={data.quantity}
                onIncrease={() => onAddQuantity(data.id)}
                onDecrease={() => onRemoveQuantity(data.id)}
              />
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
