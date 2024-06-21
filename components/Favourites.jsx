import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { MdFavorite } from "react-icons/md";
import {
  loadFavouriteArticles,
  toggleFavouriteArticle,
} from "../store/slices/favouritesSlice";
import { ReadMoreBtn } from ".";

const Favourites = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
  // Selecting favouriteArticles from Redux store
  const favouriteArticles = useSelector(
    (state) => state.favourites.favouriteArticles
  );

  // useEffect hook to load favourite articles on component mount
  useEffect(() => {
    dispatch(loadFavouriteArticles()); // Dispatching action to load favourite articles
  }, [dispatch]);

  // Function to handle favourite icon click
  const handleFavouriteClick = (article) => {
    dispatch(toggleFavouriteArticle({ article })); // Dispatching action to toggle favourite status of an article
  };

  return (
    <div className="max-w-6xl mx-auto pt-5 pb-10 px-5 space-y-10">
      {/* Heading for favourites section */}
      <h1
        className="text-3xl font-semibold underline decoration-orange-400
      underline-offset-4 max-sm:text-xl"
      >
        Favourites
      </h1>
      {/*Conditional rendering when favouriteArticles array is empty*/}
      {favouriteArticles?.length === 0 && (
        <p className="animate-pulse text-lg text-gray-500 text-center pt-20">
          :/ Your favourites list is empty...
        </p>
      )}
      {/* Grid layout for displaying favourite articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {favouriteArticles?.map((article, index) => (
          <article
            key={index}
            className="relative bg-slate-100 flex flex-col rounded-lg 
            shadow-lg hover:scale-105 hover:shadow-xl hover:bg-slate-200 
            transition-all duration-200 ease-out dark:bg-slate-800 
            dark:hover:bg-slate-700"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="h-56 w-full object-cover rounded-t-lg shadow-md"
              />
            )}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex flex-col p-5">
                <h2 className="font-bold">{article.title}</h2>
                <section className="mt-2 flex-1">
                  <p className="text-xs line-clamp-6">{article.description}</p>
                </section>
                <footer
                  className="text-xs text-right ml-auto flex items-center 
                gap-1 pt-5 italic text-gray-400"
                >
                  <p>{article.source.name}</p>-
                  {/*moment.js for date formatting*/}
                  <p>{moment(article.publishedAt).format("Do MMM YYYY")}</p>
                </footer>
              </div>
              <ReadMoreBtn article={article} />
              <MdFavorite
                className="absolute bottom-14 left-4 text-xl 
                  cursor-pointer text-orange-400"
                onClick={() => handleFavouriteClick(article)}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
