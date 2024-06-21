import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: null, // Holds the current article
  showArticle: false, // Determines whether to show the article
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    // Reducer to set the current article
    setArticle: (state, action) => {
      state.article = action.payload;
    },
    // Reducer to toggle the visibility of the article
    setShowArticle: (state, action) => {
      state.showArticle = action.payload;
    },
  },
});

export const { setArticle, setShowArticle } = articleSlice.actions;

export default articleSlice.reducer;
