import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardLoading from "./ProductCardLoading";
import { useLanguage } from "../../context/LanguageContext";

export default function ProductGrid({
  products,
  productisLoading,
  isFetching,
  search,
}) {
  const { language, translateBatch } = useLanguage();

  const [translatedProducts, setTranslatedProducts] = useState([]);
  const [loadingTranslations, setLoadingTranslations] = useState(false);

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];

  const visibleProducts = useMemo(() => {
    if (!products?.length) return [];

    if (!search?.trim()) {
      return products;
    }

    const searchText = search.trim().toLowerCase();

    return products.filter((product) => {
      return (
        product.title?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText)
      );
    });
  }, [products, search]);

  useEffect(() => {
    let cancelled = false;

    const translateProducts = async () => {
      if (language === "en") {
        setTranslatedProducts(visibleProducts);
        setLoadingTranslations(false);
        return;
      }

      if (!visibleProducts.length) {
        setTranslatedProducts([]);
        setLoadingTranslations(false);
        return;
      }

      setLoadingTranslations(true);

      const initialProducts = visibleProducts.map((product) => ({
        ...product,

        originalTitle: product.title,
        originalCategory: product.category,

        title: "",
        category: "",
      }));

      setTranslatedProducts(initialProducts);

      const texts = [];

      visibleProducts.forEach((product) => {
        if (product.title) {
          texts.push(product.title);
        }

        if (product.category) {
          texts.push(product.category);
        }
      });

      const uniqueTexts = [...new Set(texts)];

      try {
        const translatedTexts = await translateBatch(uniqueTexts);

        if (cancelled) return;

        const translationMap = new Map();

        uniqueTexts.forEach((text, index) => {
          translationMap.set(text, translatedTexts[index] || text);
        });

        const translated = visibleProducts.map((product) => ({
          ...product,

          originalTitle: product.title,
          originalCategory: product.category,

          title: product.title ? translationMap.get(product.title) || "" : "",

          category: product.category
            ? translationMap.get(product.category) || ""
            : "",
        }));

        if (!cancelled) {
          setTranslatedProducts(translated);
        }
      } catch (error) {
        console.error("Products translation error:", error);

        if (!cancelled) {
          setTranslatedProducts(
            visibleProducts.map((product) => ({
              ...product,
              originalTitle: product.title,
              originalCategory: product.category,
              title: product.title,
              category: product.category,
            })),
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingTranslations(false);
        }
      }
    };

    translateProducts();

    return () => {
      cancelled = true;
    };
  }, [visibleProducts, language, translateBatch]);

  if (language === "en") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
        {(productisLoading || isFetching) &&
          loadingArray.map((_, i) => (
            <div key={i}>
              <ProductCardLoading />
            </div>
          ))}

        {!productisLoading &&
          !isFetching &&
          visibleProducts.map((data, i) => (
            <ProductCard
              key={data.id || i}
              product={data}
              productisLoading={productisLoading}
              isFetching={isFetching}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
      {(productisLoading || isFetching) &&
        loadingArray.map((_, i) => (
          <div key={`api-loading-${i}`}>
            <ProductCardLoading />
          </div>
        ))}

      {!productisLoading &&
        !isFetching &&
        visibleProducts.map((product, index) => {
          const translated = translatedProducts[index];
          const isTranslated = translated?.title && translated?.category;

          if (!isTranslated) {
            return (
              <div key={product.id || index}>
                <ProductCardLoading />
              </div>
            );
          }

          return (
            <ProductCard
              key={product.id || index}
              product={translated}
              productisLoading={productisLoading}
              isFetching={isFetching}
            />
          );
        })}
    </div>
  );
}
