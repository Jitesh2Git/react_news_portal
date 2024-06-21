import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showFavourites: false, // Boolean to toggle the display of favourites
  favouriteArticles: [], // Array to store favourite articles
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    // Reducer to set the visibility of favourites
    setShowFavourites: (state, action) => {
      state.showFavourites = action.payload;
    },
    // Reducer to toggle an article in the favourites list
    toggleFavouriteArticle: (state, action) => {
      const { article } = action.payload;

      // Find the index of the article in the favourites list
      const index = state.favouriteArticles.findIndex(
        (favArticle) => favArticle.title === article.title
      );

      if (index !== -1) {
        state.favouriteArticles.splice(index, 1);
      } else {
        state.favouriteArticles.push(article);
      }

      // Save the updated favourites list to localStorage
      localStorage.setItem(
        "favouriteArticles",
        JSON.stringify(state.favouriteArticles)
      );
    },
    // Reducer to load favourite articles from localStorage
    loadFavouriteArticles: (state) => {
      const savedFavourites = localStorage.getItem("favouriteArticles");
      state.favouriteArticles = savedFavourites
        ? JSON.parse(savedFavourites)
        : [];
    },
  },
});

export const {
  setShowFavourites,
  toggleFavouriteArticle,
  loadFavouriteArticles,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
