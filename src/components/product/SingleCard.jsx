import { Link } from "react-router-dom";
import Button from "../button/Button";
import QuantityControl from "../button/QuantityControl";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
export default function SingleCard({
  data,
  quantity,
  onAddQuantity,
  onRemoveQuantity,
}) {
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState({ message: "", image: "" });
  const [loading, setLoading] = useState(false);
  const showToast = (message, image) => {
    setToast({ message, image });
    setTimeout(() => setToast({ message: "", image: "" }), 3000);
  };

  const handleClick = (data, reject) => {
    setLoading(true);
    showToast(
      "witing...",
      "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif",
    );
    setTimeout(() => {
      // addToCart(data);
      addToCart({
        ...data,
        quantity: quantity,
      });
      showToast(
        "Add To Cart",
        "https://img.icons8.com/?size=100&id=11208&format=png",
      );
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="flex grow  flex-wrap  w-full ">
      <div className="flex-auto  max-w-293 mx-auto ">
        <div className=" flex flex-row  gap-4  p-4 bg-[#ffffff] shadow-xs rounded-lg text-white">
          <div className="flex  items-start w-92  ">
            <img
              src={data.images?.[0]}
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
                SAR&nbsp;{data?.price?.toFixed(2)}
              </p>
              <p className="text-black indent-8 text-base/6 font[100] text-[14px] ">
                {data.description}
              </p>
            </div>
            <div className="flex w-full  gap-4 mt-auto">
              <QuantityControl
                value={quantity}
                onIncrease={() => onAddQuantity(data.id)}
                onDecrease={() => onRemoveQuantity(data.id)}
              />
              <Button
                disabled={loading}
                className={`w-full ${loading ? "cursor-not-allowed bg-[#01252c] " : "cursor-pointer"}`}
                onClick={() => handleClick(data)}
              >
                {loading ? "loding..." : "Add to cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {toast.message && (
        <div className="fixed bottom-4 right-4 bg-[#ffffff]  border-gray-300 shadow-md px-10 py-2 rounded-md flex items-center gap-2">
          <p className="text-gray-800 text-lg">{toast.message}</p>
          {toast.image && <img src={toast.image} className="w-10 h-10" />}
        </div>
      )}
    </div>
  );
}
