import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slices/articleSlice";
import themeReducer from "./slices/themeSlice";
import newsReducer from "./slices/newsSlice";
import categoryReducer from "./slices/categorySlice";
import pageReducer from "./slices/pageSlice";
import favouritesReducer, {
  loadFavouriteArticles,
} from "./slices/favouritesSlice";

const store = configureStore({
  reducer: {
    article: articleReducer,
    theme: themeReducer,
    news: newsReducer,
    category: categoryReducer,
    page: pageReducer,
    favourites: favouritesReducer,
  },
});

store.dispatch(loadFavouriteArticles());

export default store;
