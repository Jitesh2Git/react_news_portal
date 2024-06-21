import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, selectTheme } from "../store/slices/themeSlice";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ThemeSwitch = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
  const theme = useSelector(selectTheme); // Selecting theme from Redux state

  // Function to handle theme toggle
  const handleToggle = () => {
    dispatch(toggleTheme()); // Dispatching action to toggle theme
  };

  return (
    <button
      className={`text-lg ${
        theme === "light" ? "text-black" : "text-orange-400"
      }`}
      onClick={handleToggle}
    >
      {/* Conditional rendering based on theme */}
      {theme === "light" ? <FaMoon /> : <IoSunny className="text-2xl" />}
    </button>
  );
};

export default ThemeSwitch;
