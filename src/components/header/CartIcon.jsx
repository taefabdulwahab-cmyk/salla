import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import CartItem from "../Cart/CartItem";
import { CartContext } from "../../context/CartContext";

export default function CartIcon() {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );
  // const { user, logout } = useContext(UserContext);

  return (
    <Link to="/cart">
      <div className="flex items-center justify-center relative  w-10 h-10  rounded-full bg-[#bcf0e4] ">
        <img
          className="w-5 h-5 object-contain"
          src="https://www.svgrepo.com/show/520949/shopping-bag-5.svg"
          alt="Cart Icon"
        />
        <div className="absolute bg-[#9f0707] rounded-full w-6 h-6 flex items-center justify-center -top-1.5 right-6">
          <p className=" text-white ">{totalQuantity}</p>
        </div>
      </div>
    </Link>
  );
}
