import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "../constants";
import { fetchNews } from "../store/slices/newsSlice";
import {
  selectActiveCategory,
  setActiveCategory,
} from "../store/slices/categorySlice";
import { setShowArticle } from "../store/slices/articleSlice";
import { setShowFavourites } from "../store/slices/favouritesSlice";

const Categories = () => {
  const activeCategory = useSelector(selectActiveCategory); // Selecting active category from Redux store
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

  // Function to handle category click
  const handleClick = (category) => {
    dispatch(setShowArticle(false));
    const params = new URLSearchParams(window.location.search); // Getting URL search parameters
    params.set("category", category);
    params.delete("q");

    const newUrl = `/news?${params.toString()}`; // Constructing new URL

    window.history.pushState(null, "", newUrl); // Pushing new URL to history
    dispatch(setActiveCategory(category));
    dispatch(fetchNews({ category })); // Fetching news for selected category
    dispatch(setShowFavourites(false));
  };

  // useEffect hook to handle initial category selection and fetching news
  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Getting URL search parameters
    const category = params.get("category");
    const query = params.get("q");

    dispatch(setActiveCategory(category || "")); // Setting active category in Redux store
    if (query) {
      dispatch(fetchNews({ category, query }));
    } else {
      dispatch(fetchNews({ category }));
    }
  }, [dispatch]);

  return (
    // Rendering categories as navigation links
    <nav
      className="grid sm:grid-cols-4 md:grid-cols-7 items-center 
    sm:text-sm gap-2 pb-5 max-w-6xl mx-auto border-b-2 max-sm:hidden"
    >
      {categories.map((category, index) => (
        <a
          key={index}
          href={`/news?category=${category}`}
          className={`navLink ${
            activeCategory === category &&
            "underline decoration-orange-400 underline-offset-4 font-bold"
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleClick(category);
          }}
        >
          {category}
        </a>
      ))}
    </nav>
  );
};

export default Categories;
