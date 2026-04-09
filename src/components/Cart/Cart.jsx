import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import Button from "../button/Button";
import CartItem from "../Cart/CartItem";

export default function Cart() {
  const [cartItems, setCartItems] = useState(
    products.map((item) => ({ ...item, quantity: 1 })),
  );

  const handlAddQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity,
            }
          : item,
      ),
    );
  };
  const handlRemoveQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            }
          : item,
      ),
    );
  };
  const handlDeleteProduct = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className=" max-w-300.5 mx-auto px-4 static  ">
      <div className="w-full bg-white rounded-md p-4 flex flex-col ">
        <h1 className="text-2xl text-right w-full mb-5">Cart</h1>
        <div>
          {cartItems.map((data, i) => (
            <CartItem
              key={data.id}
              product={data}
              onAddQuantity={handlAddQuantity}
              onRemoveQuantity={handlRemoveQuantity}
              onDeleteProduct={handlDeleteProduct}
            />
          ))}
        </div>

        <div className="flex justify-end items-center px-4 py-8 border-t border-gray-200">
          <div className="flex gap-2 flex-row flex-1 items-center justify-between text-lg font-bold ">
            <p>Total:</p>
            <p>
              SAR&nbsp;
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
        <Link to="/login">
          <Button className="w-full">Proceed to payment</Button>
        </Link>
      </div>
    </div>
  );
}
