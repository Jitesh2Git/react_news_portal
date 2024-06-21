import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNoArticles,
  selectNewsArticles,
  selectNewsStatus,
  selectNewsError,
} from "../store/slices/newsSlice";
import {
  setPage,
  resetPage,
  selectCurrentPage,
  selectArticlesPerPage,
} from "../store/slices/pageSlice";
import moment from "moment";
import { ReadMoreBtn, Pagination } from ".";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { toggleFavouriteArticle } from "../store/slices/favouritesSlice"; // Import toggleFavouriteArticle

const NewsFeed = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
  const articles = useSelector(selectNewsArticles); // Selecting news articles from Redux store
  const status = useSelector(selectNewsStatus); // Selecting news status (loading, succeeded, failed) from Redux store
  const error = useSelector(selectNewsError); // Selecting error message from Redux store
  const noArticles = useSelector(selectNoArticles); // Selecting boolean indicating no articles found from Redux store
  const currentPage = useSelector(selectCurrentPage); // Selecting current page number from Redux store
  const articlesPerPage = useSelector(selectArticlesPerPage); // Selecting number of articles per page from Redux store
  const favouriteArticles = useSelector(
    (state) => state.favourites.favouriteArticles
  ); // Selecting favourite articles from Redux store

  useEffect(() => {
    dispatch(resetPage()); // Resetting page to 1 when component mounts or updates
  }, [dispatch]);

  // Conditional rendering based on status
  if (status === "loading") {
    return (
      <p
        className="animate-pulse text-lg text-gray-500 
      text-center pt-20"
      >
        Loading News Feed...
      </p>
    );
  } else if (status === "failed") {
    return (
      <p
        className="animate-pulse text-lg text-gray-500 
      text-center pt-20"
      >
        Error : {error} <br />
        Please Try Again...
      </p>
    );
  } else if (noArticles) {
    return (
      <p
        className="animate-pulse text-lg text-gray-500 
      text-center pt-20"
      >
        :/ No articles found matching your search...
      </p>
    );
  }

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex); // Slice articles array based on pagination

  // Function to check if an article is in favourites
  const isArticleInFavourites = (article) =>
    favouriteArticles.some((favArticle) => favArticle.title === article.title);

  // Function to handle favourite click
  const handleFavouriteClick = (article) => {
    dispatch(toggleFavouriteArticle({ article })); // Toggle favourite status of the article
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-5 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Mapping through currentArticles and rendering each article */}
        {currentArticles?.map((article, index) => (
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
              {isArticleInFavourites(article) ? ( //Conditional rendering for favourite icon
                <MdFavorite
                  className="absolute bottom-14 left-4 text-xl 
                  cursor-pointer text-orange-400"
                  onClick={() => handleFavouriteClick(article)}
                />
              ) : (
                <MdFavoriteBorder
                  className="absolute bottom-14 left-4 text-xl 
                  cursor-pointer text-gray-400"
                  onClick={() => handleFavouriteClick(article)}
                />
              )}
            </div>
          </article>
        ))}
      </div>
      <Pagination
        currentPage={currentPage} // Current page number
        totalPages={Math.ceil(articles.length / articlesPerPage)} // Total number of pages based on articles count
        onPageChange={(page) => dispatch(setPage(page))} // Callback function for page change
      />
    </div>
  );
};

export default NewsFeed;
