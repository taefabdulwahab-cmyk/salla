import React from "react";
import { createContext, useEffect, useState } from "react";
// سوينا صندوق عام اسمه CartContext
export const CartContext = createContext();

// children = كل الصفحات اللي داخل <CartProvider>
export const CartProvider = ({ children }) => {
  //     cartItems = المنتجات
  // setCartItems = نعدل السلة
  const [cartItems, setCartItems] = useState(() => {
    // يخلي السلة ما تنمسح إذا سويتي refresh.
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.images?.[0] || product.image,
          price: Number(product.price) || 0,
          quantity: Number(product.quantity) || 1,
        },
      ];
    });
  };

  const handleAddQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity,
            }
          : item,
      ),
    );
  };
  const handleRemoveQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            }
          : item,
      ),
    );
  };
  const handleDeleteProduct = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // اضيف منتج =تنحفظ
  // احذف منتج = يتحدث
  // refresh = ترجع موجودة
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // localStorage.setItem("user-token", JSON.stringify(token));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        handleAddQuantity,
        handleRemoveQuantity,
        handleDeleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
