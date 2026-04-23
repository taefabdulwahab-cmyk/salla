import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/home/HomePage";
import ProductPage from "../pages/product/ProductPage";
import CartPage from "../pages/cart/CartPage";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const routers = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "Salla", index: true, element: <HomePage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "cart", index: true, element: <CartPage /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
];
export default routers;
