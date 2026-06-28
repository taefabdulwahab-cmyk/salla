import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // يخلي السلة ما تنمسح إذا سويتي refresh.
    const savedItems = localStorage.getItem("wishlist");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find((item) => item.id === product.id);

    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        setWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
