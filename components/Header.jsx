import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Menu, Categories, ThemeSwitch, SearchBox } from ".";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setShowFavourites } from "../store/slices/favouritesSlice";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false); // State for toggling menu visibility
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

  // Selecting showFavourites state from Redux store
  const showFavourites = useSelector(
    (state) => state.favourites.showFavourites
  );

  // Function to handle favourite icon click
  const handleFavouriteClick = () => {
    dispatch(setShowFavourites(!showFavourites)); // Dispatching action to toggle showFavourites state
  };

  return (
    <header>
      <div
        className="max-w-7xl mx-auto flex items-center  
       justify-between p-10 max-sm:px-4 max-sm:pb-5"
      >
        <a href="/">
          <h1 className="text-4xl max-sm:text-xl">
            The{" "}
            <span
              className="underline decoration-6 
            decoration-orange-400"
            >
              Horizon
            </span>{" "}
            News
          </h1>
        </a>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          {showFavourites ? ( // Conditional rendering based on showFavourites state
            <MdFavorite
              className="text-2xl dark:text-orange-400 cursor-pointer"
              onClick={handleFavouriteClick}
            />
          ) : (
            <MdFavoriteBorder
              className="text-2xl dark:text-orange-400 cursor-pointer"
              onClick={handleFavouriteClick}
            />
          )}
          {toggleMenu ? ( // Conditional rendering based on toggleMenu state
            <IoMdClose
              className="text-xl block sm:hidden"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <GiHamburgerMenu
              className="text-xl block sm:hidden"
              onClick={() => setToggleMenu(true)}
            />
          )}
        </div>
      </div>
      <Categories />
      {/* Menu component rendered if toggleMenu is true */}
      {toggleMenu && <Menu setToggleMenu={setToggleMenu} />}
      <SearchBox />
    </header>
  );
};

export default Header;
