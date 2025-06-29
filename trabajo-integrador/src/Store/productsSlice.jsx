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
  loading: false,
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
    },
    updateProduct(state, action) {
      const updated = action.payload;
      const index = state.items.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        state.items[index] = updated;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  }
});


export const { toggleFavorite, addNewProduct, updateProduct } = productsSlice.actions;


export default productsSlice.reducer;
