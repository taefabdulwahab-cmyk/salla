import { useContext } from "react";
import { WishlistContext } from "../../../context/WishlistContext";

export default function WishlistCard() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  if (wishlist.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-5">My Wishlist</h1>

        <div className="bg-white p-10 rounded-lg text-center">
          No products in wishlist 🤍
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">My Wishlist</h1>

      <div className="grid grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-3 flex flex-col min-h-70.5"
          >
            <img
              src={product.images?.[0]}
              className="w-full h-40 object-contain"
            />
            <h3>{product.title}</h3>
            <p>SAR {product.price}</p>
            <button
              onClick={() => toggleWishlist(product)}
              className="mt-auto w-full bg-red-500 text-white py-2 rounded cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
