import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setArticle, setShowArticle } from "../store/slices/articleSlice";
import { setShowFavourites } from "../store/slices/favouritesSlice";

const ReadMoreBtn = ({ article }) => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

  // Function to handle click on Read More button
  const handleClick = () => {
    dispatch(setArticle(article)); // Set selected article in Redux state
    dispatch(setShowArticle(true));
    dispatch(setShowFavourites(false));
  };

  return (
    <button
      onClick={handleClick}
      className="bg-orange-400 h-10 rounded-b-lg hover:bg-orange-500"
    >
      Read More
    </button>
  );
};

// PropTypes validation for ReadMoreBtn component props
ReadMoreBtn.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string,
    }),
    publishedAt: PropTypes.string,
  }),
};

export default ReadMoreBtn;
