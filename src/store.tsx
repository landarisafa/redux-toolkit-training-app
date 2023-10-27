import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import modalSplice from "./features/modal/modalSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalSplice
    },
});