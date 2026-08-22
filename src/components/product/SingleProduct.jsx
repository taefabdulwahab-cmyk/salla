import React, { useState, useEffect, useContext } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import SingleCard from "../product/SingleCard";
import { API } from "../../api/API";
import { UserContext } from "../../context/UserContext";
import { useLanguage } from "../../context/LanguageContext";

export default function SingleProduct() {
  const { language, translate, translateBatch } = useLanguage();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["singleProduct", id, language],

    queryFn: async () => {
      const res = await API.get(`products/${id}`);
      const product = res.data;

      // English → رجع البيانات الأصلية
      // English → Arabic
      const texts = [
        product.title,
        product.shortDescription,
        product.description,
        product.category,
      ].filter(Boolean);

      const translatedTexts = await translateBatch(texts);

      let index = 0;

      const translatedTitle = product.title ? translatedTexts[index++] : "";

      const translatedShortDescription = product.shortDescription
        ? translatedTexts[index++]
        : "";

      const translatedDescription = product.description
        ? translatedTexts[index++]
        : "";

      const translatedCategory = product.category
        ? translatedTexts[index++]
        : "";

      return {
        ...product,
        title: translatedTitle,
        shortDescription: translatedShortDescription,
        description: translatedDescription,
        category: translatedCategory,
      };
    },

    // لا نستخدم بيانات قديمة لما تغيير اللغة
    staleTime: 0,
  });

  // يحمل التعليقات
  useEffect(() => {
    const loadComments = async () => {
      if (!productData?.reviews) {
        setComments([]);
        return;
      }

      const formattedReviews = await Promise.all(
        productData.reviews.map(async (review, index) => ({
          id: `review-${index}`,
          body:
            language === "ar"
              ? await translate(review.comment)
              : review.comment,
          user: {
            username: review.reviewerName,
          },
        })),
      );

      setComments(formattedReviews);
    };

    loadComments();
  }, [productData, language, translate]);

  //  تعليق
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsAddingComment(true);

    try {
      const res = await API.post("comments/add", {
        body: newComment,
        postId: Number(id),
        userId: user?.id || 1,
      });

      const commentText =
        language === "ar" ? await translate(res.data.body) : res.data.body;

      const newCommentData = {
        id: res.data.id,
        body: commentText,
        user: {
          username: res.data.user?.username || user?.username || "Guest",
        },
      };

      setComments((prev) => [newCommentData, ...prev]);

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleAddQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemoveQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <DotLottieReact
          src="https://lottie.host/9748cf75-6053-4e72-9873-1cf25a9099c5/v1rS37WZ7X.lottie"
          loop
          autoplay
          style={{ width: "200px", height: "200px" }}
        />

        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-red-500">{error.message}</span>
      </div>
    );
  }

  if (!productData) {
    return null;
  }

  return (
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
  );
}
