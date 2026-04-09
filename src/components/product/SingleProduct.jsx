import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import SingleCard from "../product/SingleCard";

export default function SingleProduct() {
  const { id } = useParams();
  const foundProduct = products.find((p) => p.id === Number(id));

  const [product, setProduct] = useState({
    ...foundProduct,
    quantity: 1,
  });

  const handleAddQuantity = () => {
    setProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const handleRemoveQuantity = () => {
    setProduct((prev) => ({
      ...prev,
      quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
    }));
  };
  // const wait = new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(products);
  //     }, 4000);
  //   });
  return (
    <div>
      <SingleCard
        data={product}
        onAddQuantity={handleAddQuantity}
        onRemoveQuantity={handleRemoveQuantity}
      />
    </div>
  );
}
