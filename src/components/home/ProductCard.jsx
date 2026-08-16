// import { products } from "../../data/products";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CartContext } from "../../context/CartContext";
import { Heart } from "lucide-react";
import { WishlistContext } from "../../context/WishlistContext";
import { useLanguage } from "../../context/LanguageContext";
export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, wishlist } = useContext(WishlistContext);
  const [toast, setToast] = useState({ message: "", image: "" });
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const showToast = (message, animation) => {
    setToast({ message, animation });
    setTimeout(() => setToast({ message: "", animation: "" }), 3000);
  };

  const handleClick = (product, reject) => {
    setLoading(true);
    showToast(
      t("waiting"),
      "https://lottie.host/8198f307-d47b-42f7-bda5-e71e88f1c8ef/AVjAWu6FdK.lottie",
    );
    setTimeout(() => {
      addToCart(product);
      showToast(
        t("addToCart"),
        "https://lottie.host/3a5828ce-7ba1-426c-a209-422e2ec801fb/zrbCh1YveA.lottie",
      );
      setLoading(false);
    }, 3000);
  };
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  return (
    <div className=" flex flex-col bg-white rounded-lg  items-center md:p-3 p-2   shadow-md  h-fit ">
      <div className=" flex  justify-center rounded-lg mb-1  ">
        <div className="w-full h-40 sm:h-50 relative">
          <Heart
            onClick={() => toggleWishlist(product)}
            fill={isWishlisted ? "currentColor" : "none"}
            className="absolute top-2 right-2 cursor-pointer"
          />

          <Link to={`/product/${product.id}`}>
            <img
              src={product.images?.[0]}
              alt="product images"
              className="object-contain w-full h-40 sm:h-50 "
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start  gap-2 sm:gap-2 md:gap-3 lg:gap-3 w-full  ">
        <div className="flex flex-col items-center justify-center gap-1 text-center w-full h-3 sm:h-3 md:h-5 lg:h-7">
          <div className="w-full min-w-0">
            <h2 className="w-full truncate text-xs sm:text-sm">
              {product.title}
            </h2>
            {/* <small>{product.description}</small> */}
          </div>
        </div>

        <div className="underline">
          <small>{product.category}</small>
        </div>
      </div>
      <div className="flex justify-center items-center w-full ">
        <div className=" m-2 sm:m-3 md:m-4 lg:m-4  text-md">
          <p className="font-bold">SAR&nbsp;{product?.price?.toFixed(2)}</p>
        </div>
      </div>

      <Button
        disabled={loading}
        className={`w-full ${loading ? "cursor-not-allowed bg-[#01252c] " : "cursor-pointer"}`}
        onClick={() => handleClick(product)}
      >
        {loading ? t("loading") : t("addToCart")}
      </Button>

      {toast.message && (
        <div className="fixed bottom-4 right-2 sm:right-4  bg-[#ffffff]  border-gray-300 shadow-md px-3 sm:px-5 md:px-10 py-2 rounded-md flex items-center z-50 max-w-[calc(100%-1rem)]">
          <p className="text-gray-800 text-sm sm:text-base md:text-lg">
            {toast.message}
          </p>
          {toast.animation && (
            <DotLottieReact
              src={toast.animation}
              autoplay
              loop
              // style={{ width: "50px", height: "50px" }}
              className="w-11.25 h-11.25 sm:w-12.5 sm:h-12.5 md:w-20 md:h-20"
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
