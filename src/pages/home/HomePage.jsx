import React, { useContext, useState } from "react";
import HeroSection from "../../components/home/HeroSection";
import ProductFilter from "../../components/home/ProductFilter";
import ProductGrid from "../../components/home/ProductGrid";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { API } from "../../api/API";
import { useQuery } from "@tanstack/react-query";
import { product } from "../../data/products";
import { CartContext } from "../../context/CartContext";
export default function HomePage() {
  const { token } = useContext(UserContext);

  const { data: productData } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await product.get("/products").then((res) => res.data),
  });

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () =>
      await API.get(`auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="w-full h-125 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://icons8.com/preloaders/preloaders/813/preview.gif"
            className="w-30 opacity-100 rounded-full mb-2"
          />
          <span>is Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-125 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://icons8.com/preloaders/preloaders/364/preview.gif"
            className="opacity-30 rounded-full"
          />
          <span>you need to login first...</span>
          <span>{error?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-300 mx-auto px-4">
        <div className="bg-white rounded-md p-4 flex gap-5 flex-col">
          <HeroSection />
          <ProductFilter />
          <ProductGrid products={productData?.products} />
        </div>
      </div>
    </>
  );
}
