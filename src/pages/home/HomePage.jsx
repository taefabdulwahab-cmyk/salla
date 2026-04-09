import React from "react";
import HeroSection from "../../components/home/HeroSection";
import ProductFilter from "../../components/home/ProductFilter";
import ProductGrid from "../../components/home/ProductGrid";

export default function HomePage() {
  return (
    <>
      <div className="max-w-300 mx-auto px-4">
        <div className="bg-white rounded-md p-4 flex gap-5 flex-col">
          <HeroSection />
          <ProductFilter />
          <ProductGrid />
        </div>
      </div>
    </>
  );
}
