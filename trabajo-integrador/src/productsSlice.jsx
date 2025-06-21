import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return await response.json();
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    favorites: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter(id => id !== productId);
      } else {
        state.favorites.push(productId);
      }
    },
    addNewProduct(state, action) {
      state.items.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const { toggleFavorite, addNewProduct } = productsSlice.actions;

export default productsSlice.reducer;
