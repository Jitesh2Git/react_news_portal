import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Constants for API parameters
const MAX = 100;
const HAS_SUBSCRIPTION = true;
const CACHE_KEY_PREFIX = "newsArticles";

// Function to generate cache key based on category
const getCacheKey = (category) => `${CACHE_KEY_PREFIX}_${category || "home"}`;

// Async thunk for fetching news articles
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ category = "", query = "" }, { rejectWithValue }) => {
    const cacheKey = getCacheKey(category);

    // Check session storage for cached data
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData && !query) {
      return JSON.parse(cachedData);
    }

    try {
      let url = `${BASE_URL}?lang=en&country=us&max=${MAX}&apikey=${API_KEY}`;

      if (category) {
        url += `&category=${category}`;
      }
      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }
      if (HAS_SUBSCRIPTION) {
        url += `&expand=content`;
      }

      const response = await axios.get(url);

      // Cache data if no query parameter
      if (!query) {
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify(response.data.articles)
        );
      }

      return response.data.articles;
    } catch (error) {
      console.error("Error fetching news:", error.message);
      return rejectWithValue("Failed to fetch news articles");
    }
  }
);

const initialState = {
  articles: [], // Array of news articles
  status: "idle", // Status of async operation (idle/loading/succeeded/failed)
  error: null, // Error message on failed fetch
  noArticles: false, // Flag indicating if no articles were found
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    // Reducer to set initial articles
    setInitialArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Case for pending fetchNews action
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.noArticles = false;
      })
      // Case for successful fetchNews action
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
        state.noArticles = action.payload.length === 0;
      })
      // Case for failed fetchNews action
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.noArticles = false;
      });
  },
});

export const { setInitialArticles } = newsSlice.actions;

// Selectors to retrieve specific parts of news state
export const selectNewsArticles = (state) => state.news.articles;
export const selectNewsStatus = (state) => state.news.status;
export const selectNewsError = (state) => state.news.error;
export const selectNoArticles = (state) => state.news.noArticles; // New selector

export default newsSlice.reducer;
