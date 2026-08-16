import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import ReactQuery from "./provider/ReactQuery.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactQuery>
      <LanguageProvider>
        <UserProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </UserProvider>
      </LanguageProvider>
    </ReactQuery>
  </StrictMode>,
);
