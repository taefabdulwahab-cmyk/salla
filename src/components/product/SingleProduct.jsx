import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../../data/products";
import SingleCard from "../product/SingleCard";
import { useQuery } from "@tanstack/react-query";

export default function SingleProduct() {
  const { id } = useParams();
  const {
    data: productData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      await product.get(`products/${id}`).then((res) => res.data),
  });

  const [quantity, setQuantity] = useState(1);

  const handleAddQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemoveQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div>
      {isFetching && <span>Loading...</span>}

      {error && <span>{error.message}</span>}

      {!isFetching && !error && (
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
