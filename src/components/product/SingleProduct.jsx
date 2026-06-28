import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { product } from "../../data/products";
import SingleCard from "../product/SingleCard";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";

import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
export default function SingleProduct() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  const [isAddingComment, setIsAddingComment] = useState(false);
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
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${id}`);

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setIsAddingComment(true);

    setTimeout(() => {
      const comment = {
        id: Date.now(),
        body: newComment,
        user: {
          username: user?.username || "Guest",
        },
      };

      const updatedComments = [comment, ...comments];

      setComments(updatedComments);

      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));

      setNewComment("");
      setIsAddingComment(false);
    }, 1000);
  };

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
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          isAddingComment={isAddingComment}
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
