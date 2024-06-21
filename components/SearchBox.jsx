import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/slices/newsSlice";
import { selectActiveCategory } from "../store/slices/categorySlice";
import { setShowArticle } from "../store/slices/articleSlice";
import { setShowFavourites } from "../store/slices/favouritesSlice";
import { resetPage } from "../store/slices/pageSlice";

const SearchBox = () => {
  const [input, setInput] = useState(""); // State to manage input value
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
  const activeCategory = useSelector(selectActiveCategory); // Select active category from Redux state

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if input is not empty after trimming whitespace
    if (input.trim() !== "") {
      const formattedQuery = formatQuery(input.trim());
      if (formattedQuery) {
        // Create URLSearchParams object
        const params = new URLSearchParams(window.location.search);
        params.set("q", formattedQuery);

        // Set 'category' parameter if active category exists
        if (activeCategory) {
          params.set("category", activeCategory);
        }

        const newUrl = `/news?${params.toString()}`; // Construct new URL with updated parameters
        window.history.pushState(null, "", newUrl); // Update browser history with new URL

        // Dispatch actions to fetch news, hide article details, hide favourites, reset pagination, and clear input
        dispatch(
          fetchNews({ query: formattedQuery, category: activeCategory })
        );
        dispatch(setShowArticle(false));
        dispatch(setShowFavourites(false));
        dispatch(resetPage());
        setInput(""); // Clear input field
      } else {
        // Log error for invalid query format
        console.error("Invalid query format. Please check the syntax rules.");
      }
    }
  };

  // Function to format query input
  const formatQuery = (query) => {
    if (
      query.includes('"') ||
      query.includes(" OR ") ||
      query.includes(" AND ") ||
      query.includes(" NOT ")
    ) {
      return query;
    } else {
      // Enclose query in double quotes if no operators are detected
      return `"${query}"`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto flex justify-between items-center 
      gap-2 px-3 border-b-2"
    >
      <input
        type="text"
        value={input}
        placeholder="Search Keywords..."
        className="flex-1 gap-2 w-full h-14 rounded-md placeholder-gray-500 
        text-gray-500 outline-none bg-transparent px-2"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-orange-400 disabled:text-gray-400 
        disabled:bg-gray-200 py-2 px-3 rounded-md hover:bg-orange-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
