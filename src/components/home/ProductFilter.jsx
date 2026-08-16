// import React, { useState } from "react";
// // import { products } from "../../data/products";
// import ProductSearch from "./ProductSearch";
// import { useLanguage } from "../../context/LanguageContext";
// export default function ProductFilter({
//   Filters,
//   setFilters,
//   search,
//   setSearch,
//   category,
//   searchData,
// }) {
//   const { t } = useLanguage();
//   return (
//     <div className="flex gap-5 flex-row items-center ">
//       <div className="grow">
//         <ProductSearch
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setFilters("");
//           }}
//           placeholder={t("searchProducts")}
//         />
//         {search && (
//           <div>
//             {searchData?.products?.map((item, i) => (
//               <p key={i} value={item}></p>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="border rounded-md border-gray-200 ">
//         <select
//           className="p-1 "
//           value={Filters}
//           onChange={(e) => {
//             setFilters(e.target.value);
//             setSearch("");
//           }}
//         >
//           <option value="">{t("allProducts")}</option>
//           {category?.map((cat, i) => (
//             <option value={cat} key={i}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import ProductSearch from "./ProductSearch";
import { useLanguage } from "../../context/LanguageContext";

export default function ProductFilter({
  Filters,
  setFilters,
  search,
  setSearch,
  category,
}) {
  const { t, language, translate } = useLanguage();

  const [translatedCategories, setTranslatedCategories] = useState([]);

  const translationCache = useRef(new Map());

  useEffect(() => {
    let cancelled = false;

    const translateCategories = async () => {
      if (!category?.length) {
        setTranslatedCategories([]);
        return;
      }

      if (language === "en") {
        setTranslatedCategories(category);
        return;
      }

      const translated = [];

      for (const cat of category) {
        if (cancelled) return;

        if (translationCache.current.has(cat)) {
          translated.push(translationCache.current.get(cat));
          continue;
        }

        const translatedCategory = await translate(cat);

        translationCache.current.set(cat, translatedCategory);

        translated.push(translatedCategory);
      }

      if (!cancelled) {
        setTranslatedCategories(translated);
      }
    };

    translateCategories();

    return () => {
      cancelled = true;
    };
  }, [category, language, translate]);

  return (
    <div className="flex gap-4 w-full">
      <ProductSearch
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setFilters("");
        }}
        placeholder={t("searchProducts")}
      />

      <div className="border rounded-md border-gray-200">
        <select
          className="p-1"
          value={Filters}
          onChange={(e) => {
            setFilters(e.target.value);
            setSearch("");
          }}
        >
          <option value="">{t("allProducts")}</option>

          {category?.map((cat, i) => (
            <option value={cat} key={cat}>
              {translatedCategories[i] || cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
