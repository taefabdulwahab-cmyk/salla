// import { products } from "../../data/products";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CartContext } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState({ message: "", image: "" });
  const [loading, setLoading] = useState(false);

  const showToast = (message, animation) => {
    setToast({ message, animation });
    setTimeout(() => setToast({ message: "", animation: "" }), 3000);
  };

  const handleClick = (product, reject) => {
    setLoading(true);
    showToast(
      "witing...",
      "https://lottie.host/8198f307-d47b-42f7-bda5-e71e88f1c8ef/AVjAWu6FdK.lottie",
    );
    setTimeout(() => {
      addToCart(product);
      showToast(
        "Add To Cart",
        "https://lottie.host/3a5828ce-7ba1-426c-a209-422e2ec801fb/zrbCh1YveA.lottie",
      );
      setLoading(false);
    }, 3000);
  };

  return (
    <div className=" flex flex-col bg-white rounded-lg  items-center md:p-3 p-2   shadow-md  h-fit ">
      <div className=" flex  justify-center rounded-lg mb-2  ">
        <div className="w-full h-50 relative">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images?.[0]}
              alt="product images"
              className="object-contain w-full h-50 "
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-2 w-full  ">
        <div className="flex flex-col items-center justify-center gap-1 text-center w-full h-28">
          <div>
            <h2>{product.title}</h2>
            <small>{product.shortDescription}</small>
          </div>
        </div>

        <div className="underline">
          <small>{product.category}</small>
        </div>
      </div>
      <div className="flex justify-center items-center w-full ">
        <div className=" m-4 text-md">
          <p className="font-bold">SAR&nbsp;{product?.price?.toFixed(2)}</p>
        </div>
      </div>

      <Button
        disabled={loading}
        className={`w-full ${loading ? "cursor-not-allowed bg-[#01252c] " : "cursor-pointer"}`}
        onClick={() => handleClick(product)}
      >
        {loading ? "loding..." : "Add to cart"}
      </Button>

      {toast.message && (
        <div className="fixed bottom-4 right-4 bg-[#ffffff]  border-gray-300 shadow-md px-10 py-2 rounded-md flex items-center ">
          <p className="text-gray-800 text-lg">{toast.message}</p>
          {toast.animation && (
            <DotLottieReact
              src={toast.animation}
              autoplay
              loop
              style={{ width: "60px", height: "60px" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
{
  /* {toast.image && <img src={toast.image} className="w-10 h-10" />} */
}
