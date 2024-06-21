import { useSelector } from "react-redux";
import { Article, Header, NewsFeed, Favourites } from "../components";
import { selectTheme } from "../store/slices/themeSlice";

const App = () => {
  // Selecting state values from Redux store
  const showArticle = useSelector((state) => state.article.showArticle);
  const showFavourites = useSelector(
    (state) => state.favourites.showFavourites
  );
  const theme = useSelector(selectTheme);

  return (
    <main
      className={`${theme} font-serif bg-gray-100
      overflow-x-hidden transition-all duration-700
     dark:bg-zinc-900 dark:text-white min-h-screen`}
    >
      {/* 
      Header component always rendered. Conditional rendering:
      - Renders <Favourites /> if showFavourites is true.
      - Renders <Article /> if showArticle is true.
      - Renders <NewsFeed /> if neither showFavourites nor showArticle is true.
      */}
      <Header />
      {showFavourites ? (
        <Favourites />
      ) : showArticle ? (
        <Article />
      ) : (
        <NewsFeed />
      )}
    </main>
  );
};

export default App;
