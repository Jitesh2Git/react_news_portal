import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: "", // Holds the currently active category
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Reducer to set the active category
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categorySlice.actions;

// Selector to get the active category from the state
export const selectActiveCategory = (state) => state.category.activeCategory;

export default categorySlice.reducer;
