import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import AuthLayout from "../layouts/AuthLayout";

const routers = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", exact: true, element: <LoginPage /> },
      { path: "signup", exact: true, element: <SignupPage /> },
    ],
  },
];
export default routers;
