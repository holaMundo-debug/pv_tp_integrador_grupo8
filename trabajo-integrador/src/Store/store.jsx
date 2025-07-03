import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice"; // nuevo slice para usuario

export default configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer, // se suma sin tocar lo anterior
  }
});
