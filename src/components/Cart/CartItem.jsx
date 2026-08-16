import React, { useEffect, useState } from "react";
import QuantityControl from "../button/QuantityControl";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
export default function CartItem({
  product,
  onAddQuantity,
  onRemoveQuantity,
  onDeleteProduct,
}) {
  const { language, translate } = useLanguage();

  const [translatedTitle, setTranslatedTitle] = useState(product.title);
  useEffect(() => {
    const translateTitle = async () => {
      if (language === "en") {
        setTranslatedTitle(product.title);
        return;
      }

      if (!product.title) return;

      const result = await translate(product.title);

      setTranslatedTitle(result);
    };

    translateTitle();
  }, [product.title, language]);
  return (
    <div>
      <div className="flex flex-row gap-4 justify-between items-center w-full p-2.5 md:p-4">
        <div className="flex gap-2 flex-row flex-1 items-center  ">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt="product"
              className=" object-cover w-10 "
            />
          </Link>
          <div className="flex flex-col gap-1 w-fit">
            <h1 className="w-fit text-sm md:text-base">{translatedTitle}</h1>

            <div className="flex flex-row gap-2 items-center ">
              <p className="font-bold 1tr">X{product.quantity}</p>
              <span className=" font-medium text-xs text-gray-500 ">
                SAR&nbsp;{Number(product.price).toFixed(2)}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3 md:gap-4">
          <QuantityControl
            value={product.quantity}
            onIncrease={() => onAddQuantity(product.id)}
            onDecrease={() => onRemoveQuantity(product.id)}
          />
          <img
            className="w-6 p-1 md:w-7 rounded-full border-2 border-red-600 cursor-pointer"
            src="https://www.svgrepo.com/show/494116/garbage-can.svg"
            alt="delete"
            onClick={(e) => {
              e.preventDefault();
              onDeleteProduct(product.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
