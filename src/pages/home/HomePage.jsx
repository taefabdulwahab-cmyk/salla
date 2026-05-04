import React, { useContext, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import HeroSection from "../../components/home/HeroSection";
import ProductFilter from "../../components/home/ProductFilter";
import ProductGrid from "../../components/home/ProductGrid";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { API } from "../../api/API";
import { useQuery } from "@tanstack/react-query";
export default function HomePage() {
  const { token } = useContext(UserContext);
  const [Filters, setFilters] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: productData,
    isLoading: productisLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", Filters, search],
    queryFn: async () =>
      await API.get(
        Filters
          ? `/products/category/${Filters}`
          : search
            ? `/products/search?q=${search}`
            : "/products",
      ).then((res) => res.data),
  });

  const { data: category } = useQuery({
    queryKey: ["category-list"],
    queryFn: async () =>
      await API.get("/products/category-list").then((res) => res.data),
  });

  const { data: searchData } = useQuery({
    queryKey: ["Search-Items"],
    queryFn: async () =>
      await API.get(`/products/search?q=`).then((res) => res.data),
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
          <ProductFilter
            Filters={Filters}
            setFilters={setFilters}
            search={search}
            setSearch={setSearch}
            searchData={searchData}
            category={category}
          />
          <p className="text-sm text-gray-500">
            Products : {productData?.products?.length || 0}
          </p>
          <ProductGrid
            products={productData?.products}
            productisLoading={productisLoading}
            isFetching={isFetching}
          />
        </div>
      </div>
    </>
  );
}
// productData?.products

// const filteredProducts1 =
//   Filters === "all"
//     ? productData?.products
//     : productData?.products?.filter((p) => p.category === Filters);

// const SearchProducts1 =
//   search === ""
//     ? productData?.products
//     : productData?.products?.filter((p) => {
//         const text = search.toLowerCase();

//         return (
//           p.title.toLowerCase().includes(text) ||
//           p.category.toLowerCase().includes(text)
//         );
//       });
