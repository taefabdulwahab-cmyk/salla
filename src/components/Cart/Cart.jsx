import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import CartItem from "../Cart/CartItem";
import { CartContext } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
export default function Cart() {
  const { t } = useLanguage();
  const {
    cartItems,
    handleAddQuantity,
    handleRemoveQuantity,
    handleDeleteProduct,
  } = useContext(CartContext);

  return (
    <div className=" max-w-300.5 mx-auto px-4 static  ">
      <div className="w-full bg-white rounded-md p-4 flex flex-col ">
        <h1 className="text-2xl text-right w-full mb-5">{t("cart")}</h1>
        <div>
          {cartItems.map((data, index) => (
            <CartItem
              key={data.id || index}
              product={data}
              onAddQuantity={handleAddQuantity}
              onRemoveQuantity={handleRemoveQuantity}
              onDeleteProduct={handleDeleteProduct}
            />
          ))}
        </div>

        <div className="flex justify-end items-center px-4 py-8 border-t border-gray-200">
          <div className="flex gap-2 flex-row flex-1 items-center justify-between text-sm md:text-lg font-bold ">
            <p>{t("total")}</p>
            <p>
              SAR&nbsp;
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
        <Link to="/login">
          <Button className="w-full">{t("proceedToPayment")}</Button>
        </Link>
      </div>
    </div>
  );
}
