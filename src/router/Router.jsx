import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/home/HomePage";
import ProductPage from "../pages/product/ProductPage";
import CartPage from "../pages/cart/CartPage";
import ProductGrid from "../components/home/ProductGrid";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminDisplayArea from "../components/Admin/AdminDisplayArea";
import AllUsers from "../components/Users/AllUsers";
import AdminProduct from "../components/Admin/AdminProduct";
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

  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      { path: "", exact: true, element: <AdminDisplayArea /> },
      { path: "products", exact: true, element: <AdminProduct /> },
      { path: "users", exact: true, element: <AllUsers /> },
    ],
  },
];
export default routers;
