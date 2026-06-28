import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/home/HomePage";
import ProductPage from "../pages/product/ProductPage";
import CartPage from "../pages/cart/CartPage";
import ProductGrid from "../components/home/ProductGrid";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProfileDashboardPage from "../pages/dashboard/Profile/ProfileDashboardPage";
import AdminUsersPage from "../pages/dashboard/Users/AdminUsersPage";
import AdminProductPage from "../pages/dashboard/Product/AdminProductPage";
import WishlistPage from "../pages/dashboard/Wishlist/WishlistPage";
import ProtectedRoute from "./ProtectedRoute";
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
    element: <DashboardLayout />,
    children: [
      { path: "Profile", index: true, element: <ProfileDashboardPage /> },

      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          { path: "users", element: <AdminUsersPage /> },
          { path: "products", element: <AdminProductPage /> },
        ],
      },
      // , "admin"

      {
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [{ path: "wishlist", element: <WishlistPage /> }],
      },
    ],
  },
];
export default routers;
