import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "../constants";
import {
  selectActiveCategory,
  setActiveCategory,
} from "../store/slices/categorySlice";
import { fetchNews } from "../store/slices/newsSlice";
import { setShowArticle } from "../store/slices/articleSlice";

const Menu = ({ setToggleMenu }) => {
  const activeCategory = useSelector(selectActiveCategory); // Selecting activeCategory state from Redux store
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

  // Function to handle category click
  const handleClick = (category) => {
    setToggleMenu(false);
    dispatch(setShowArticle(false));
    dispatch(setActiveCategory(category)); // Set activeCategory state to selected category
    const params = new URLSearchParams(window.location.search); // Initialize URLSearchParams object
    params.set("category", category);
    params.delete("q");
    window.history.pushState(null, "", `/news?${params.toString()}`); // Update URL
    dispatch(fetchNews({ category })); // Fetch news articles for the selected category
  };

  return (
    // Rendering categories as navigation links
    <nav
      className="fixed flex flex-col sm:hidden top-1/2
    left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    border border-orange-400 min-w-[80%] rounded-xl bg-gray-200 
    dark:bg-zinc-900 z-10 shadow-xl"
    >
      {categories.map((category, index) => (
        <a
          key={index}
          href={`/news?category=${category}`}
          className={`navLink ${
            activeCategory === category &&
            "underline decoration-orange-400 underline-offset-4 font-bold text-lg"
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

// PropTypes validation for Menu component props
Menu.propTypes = {
  setToggleMenu: PropTypes.func,
};

export default Menu;
