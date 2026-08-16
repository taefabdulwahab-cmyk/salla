import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";

import Button from "../button/Button";
import QuantityControl from "../button/QuantityControl";

export default function SingleCard({
  data,
  quantity,
  onAddQuantity,
  onRemoveQuantity,
  comments,
  newComment,
  setNewComment,
  handleAddComment,
  isAddingComment,
}) {
  const { addToCart } = useContext(CartContext);
  const { t } = useLanguage();

  const [toast, setToast] = useState({
    message: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const showToast = (message, image) => {
    setToast({
      message,
      image,
    });

    setTimeout(() => {
      setToast({
        message: "",
        image: "",
      });
    }, 3000);
  };

  const handleClick = () => {
    setLoading(true);

    showToast(
      t("waiting"),
      "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif",
    );

    setTimeout(() => {
      addToCart({
        ...data,
        quantity: quantity,
      });

      showToast(
        t("addToCart"),
        "https://img.icons8.com/?size=100&id=11208&format=png",
      );

      setLoading(false);
    }, 3000);
  };

  return (
    <div className="flex grow flex-wrap w-full ">
      <div className="flex-auto max-w-290 mx-auto ">
        {/* Product */}
        <div className="flex flex-col md:flex-row gap-3 p-4 bg-[#ffffff] shadow-xs rounded-lg text-white md:mt-10">
          {/* Image */}
          <div className="flex items-center md:items-start">
            <img
              src={data.images?.[0]}
              alt="product image"
              className="h-50 m-5 sm:h-70 w-full object-cover rounded-lg md:mb-2"
            />
          </div>

          {/* Information */}
          <div className="flex flex-col flex-1 gap-4 ">
            <div className="flex items-end text-right flex-col gap-4">
              <h1 className="text-2xl md:text-4xl text-black md:mb-5">
                {data.title}
              </h1>

              {/* <small className="text-gray-500 font-light text-xs">
                {data.shortDescription}
              </small> */}

              <p className="text-black text-[20px] font-medium mt-3 mb-2 md:mt-6 md:mb-4 text-left w-full">
                SAR&nbsp;
                {data?.price?.toFixed(2)}
              </p>

              <p className="text-black indent-8  font[100] md:text-base/7 ">
                {data.description}
              </p>
            </div>

            {/* Quantity + Add */}
            <div className="flex w-full gap-4 mt-auto">
              <QuantityControl
                value={quantity}
                onIncrease={() => onAddQuantity(data.id)}
                onDecrease={() => onRemoveQuantity(data.id)}
              />

              <Button
                disabled={loading}
                className={`w-full ${
                  loading ? "cursor-not-allowed bg-[#01252c]" : "cursor-pointer"
                }`}
                onClick={handleClick}
              >
                {loading ? t("loading") : t("addToCart")}
              </Button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-8 sm:mt-10 bg-white p-4 sm:p-5 rounded-lg shadow-sm w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {t("comments")}
          </h2>

          {/* Add Comment */}
          <div className="flex flex-col sm:flex-row gap-2 mb-5">
            <input
              type="text"
              placeholder={t("writeComment")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-md outline-none text-sm sm:text-base"
            />

            <button
              onClick={handleAddComment}
              disabled={isAddingComment}
              className="bg-black text-white px-5 py-2 sm:py-2.5 rounded-md cursor-pointer
                 w-full sm:w-auto whitespace-nowrap text-sm sm:text-base"
            >
              {isAddingComment ? t("adding") : t("add")}
            </button>
          </div>

          {/* Comments List */}
          <div className="flex flex-col gap-3">
            {comments.map((comment, index) => (
              <div key={index} className="border p-3 sm:p-4 rounded-md w-full">
                <h3 className="font-semibold text-sm sm:text-base break-words">
                  {comment.user?.username || "Anonymous"}
                </h3>

                <p className="mt-2 text-gray-600 text-sm sm:text-base break-words">
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Toast */}
      {toast.message && (
        <div className="fixed bottom-4 right-2 sm:right-4  bg-[#ffffff]  border-gray-300 shadow-md px-3 sm:px-5 md:px-10 py-2 rounded-md flex items-center z-50 max-w-[calc(100%-1rem)]">
          <p className="text-gray-800 text-sm sm:text-base md:text-lg">
            {toast.message}
          </p>

          {toast.image && (
            <img src={toast.image} alt="" className="w-10 h-10" />
          )}
        </div>
      )}
    </div>
  );
}
