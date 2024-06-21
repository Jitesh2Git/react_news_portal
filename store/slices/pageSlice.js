import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1, // Current page number
  articlesPerPage: 6, // Number of articles per page
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    // Reducer function to set the current page
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Reducer function to reset the current page to 1
    resetPage: (state) => {
      state.currentPage = 1;
    },
  },
});

export const { setPage, resetPage } = pageSlice.actions;

// Selectors to retrieve specific parts of page state
export const selectCurrentPage = (state) => state.page.currentPage;
export const selectArticlesPerPage = (state) => state.page.articlesPerPage;

export default pageSlice.reducer;
