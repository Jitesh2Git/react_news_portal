import { createSlice } from "@reduxjs/toolkit";

// Function to determine initial theme based on localStorage and user preferences
const getInitialTheme = () => {
  // Retrieve saved theme from localStorage
  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }

  // If no saved theme, check user's system preference for dark mode
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
};

// Initialize theme based on initial theme detection
const initialTheme = getInitialTheme();
if (initialTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const initialState = {
  theme: initialTheme, // Current theme
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Toggle between light and dark theme
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", state.theme);
      // Update document element class based on theme change
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    // Set theme explicitly
    setTheme: (state, action) => {
      state.theme = action.payload;
      window.localStorage.setItem("theme", state.theme);
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Selector function to retrieve current theme
export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;
