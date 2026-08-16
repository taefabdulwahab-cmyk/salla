import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardLoading from "./ProductCardLoading";
import { useLanguage } from "../../context/LanguageContext";

export default function ProductGrid({
  products,
  productisLoading,
  isFetching,
  search,
}) {
  const { language, translate } = useLanguage();

  const [translatedProducts, setTranslatedProducts] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);

  const translationCache = useRef(new Map());

  const Array = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const translateProducts = async () => {
      if (language === "en") {
        setTranslatedProducts(products || []);
        setIsTranslating(false);
        return;
      }

      if (!products?.length) {
        setTranslatedProducts([]);
        setIsTranslating(false);
        return;
      }

      setIsTranslating(true);

      const translated = [];

      for (const product of products) {
        const title = product.title
          ? translationCache.current.has(product.title)
            ? translationCache.current.get(product.title)
            : await translate(product.title)
          : "";

        const category = product.category
          ? translationCache.current.has(product.category)
            ? translationCache.current.get(product.category)
            : await translate(product.category)
          : "";

        const description = product.description
          ? translationCache.current.has(product.description)
            ? translationCache.current.get(product.description)
            : await translate(product.description)
          : "";

        if (product.title) {
          translationCache.current.set(product.title, title);
        }

        if (product.category) {
          translationCache.current.set(product.category, category);
        }
        if (product.description) {
          translationCache.current.set(product.description, description);
        }
        translated.push({
          ...product,
          originalTitle: product.title,
          originalCategory: product.category,
          originalيescription: product.description,
          title,
          category,
        });
      }

      setTranslatedProducts(translated);
      setIsTranslating(false);
    };

    translateProducts();
  }, [products, language]);

  const displayedProducts = language === "ar" ? translatedProducts : products;

  const filteredProducts = displayedProducts?.filter((product) => {
    if (!search.trim()) return true;

    const searchText = search.toLowerCase();

    return (
      product.title?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.originalTitle?.toLowerCase().includes(searchText) ||
      product.originalCategory?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
      {(productisLoading ||
        isFetching ||
        (language === "ar" && isTranslating)) &&
        Array.map((_, i) => (
          <div key={i}>
            <ProductCardLoading />
          </div>
        ))}

      {!productisLoading &&
        !isFetching &&
        !(language === "ar" && isTranslating) &&
        filteredProducts?.map((data, i) => (
          <ProductCard
            key={i}
            product={data}
            productisLoading={productisLoading}
            isFetching={isFetching}
          />
        ))}
    </div>
  );
}
