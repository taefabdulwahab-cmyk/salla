import React from "react";
import ProductSearch from "./ProductSearch";
import { useLanguage } from "../../context/LanguageContext";

export default function ProductFilter({
  Filters,
  setFilters,
  search,
  setSearch,
  category,
}) {
  const { t } = useLanguage();

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

          {category?.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
