import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { useParams } from "react-router-dom";
// import { product } from "../../data/products";
import SingleCard from "../product/SingleCard";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";

export default function SingleProduct() {
  const { id } = useParams();
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      await API.get(`products/${id}`).then((res) => res.data),
  });

  const [quantity, setQuantity] = useState(1);

  const handleAddQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemoveQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  if (isLoading) {
    return (
      <div className="w-full h-125 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          {/* <img
            src="https://icons8.com/preloaders/preloaders/813/preview.gif"
            className="w-30 opacity-100 rounded-full mb-2"
          /> */}

          <DotLottieReact
            src="https://lottie.host/9748cf75-6053-4e72-9873-1cf25a9099c5/v1rS37WZ7X.lottie"
            loop
            autoplay
          />
          <span>is Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-125 flex items-center justify-center">
        <span>{error?.message}</span>
      </div>
    );
  }

  return (
    <div>
      {!isLoading && !error && (
        <SingleCard
          data={productData}
          quantity={quantity}
          onAddQuantity={handleAddQuantity}
          onRemoveQuantity={handleRemoveQuantity}
        />
      )}
    </div>
  );
}

// const foundProduct = products.find((p) => p.id === Number(id));

// const [product, setProduct] = useState({
//   ...foundProduct,
//   quantity: 1,
// });

// const wait = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(products);
//     }, 4000);
//   });

/* {isLoading && <span>Loading...</span>}

      {error && <span>{error.message}</span>} */
