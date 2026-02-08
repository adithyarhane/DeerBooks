import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UiContextProvider } from "./context/UiContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BookContextProvider } from "./context/BookContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { WishlistContextProvider } from "./context/WishlistContext.jsx";
import { OrderContextProvider } from "./context/OrderContext.jsx";
import { ReviewContextProvider } from "./context/ReviewContext.jsx";
import { PaymentContextProvider } from "./context/PaymentContext.jsx";
import { AddressContextProvider } from "./context/AddressContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <ReviewContextProvider>
              <BookContextProvider>
                <AddressContextProvider>
                  <PaymentContextProvider>
                    <OrderContextProvider>
                      <UiContextProvider>
                        <App />
                      </UiContextProvider>
                    </OrderContextProvider>
                  </PaymentContextProvider>
                </AddressContextProvider>
              </BookContextProvider>
            </ReviewContextProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
