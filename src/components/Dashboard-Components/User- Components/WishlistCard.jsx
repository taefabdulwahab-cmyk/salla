import { useContext } from "react";
import { WishlistContext } from "../../../context/WishlistContext";
import { useLanguage } from "../../../context/LanguageContext";
export default function WishlistCard() {
  const { t } = useLanguage();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  if (wishlist.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-5">{t("mywishlist")}</h1>

        <div className="bg-white p-10 rounded-lg text-center">
          {t("noProductsInWishlist")}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full p-6 ">
      <div className="mb-6 md:mb-8 ">
        <h1 className="text-2xl sm:text-3xl font-bold mb-5">
          {t("mywishlist")}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-3 flex flex-col min-h-70.5"
            >
              <img
                src={product.images?.[0]}
                className="w-full h-40 object-contain"
              />
              <h3 className="text-sm sm:text-base truncate mt-2">
                {product.title}
              </h3>
              <p className="text-sm sm:text-base mt-1">SAR {product.price}</p>
              <button
                onClick={() => toggleWishlist(product)}
                className="mt-auto w-full bg-red-500 text-white py-2 rounded cursor-pointe text-sm sm:text-base"
              >
                {t("remove")}{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
