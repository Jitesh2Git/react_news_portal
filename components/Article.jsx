import { useDispatch, useSelector } from "react-redux";
import { setShowArticle } from "../store/slices/articleSlice";
import moment from "moment";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect } from "react";

const Article = () => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
  const article = useSelector((state) => state.article.article); // Selecting the current article from Redux store

  // Effect hook to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to handle going back to news feed view
  const handleBack = () => {
    dispatch(setShowArticle(false)); // Dispatching action to hide article view
  };

  if (!article) return null;

  return (
    <article className="max-w-6xl mx-auto py-5 px-5 space-y-5">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="group bg-orange-400 rounded-lg px-3 py-2
      hover:bg-orange-500 flex items-center"
      >
        <IoIosArrowRoundBack className="group-hover:-translate-x-1.5 text-2xl" />
        Back
      </button>
      {/* Main article section */}
      <section
        className="flex flex-col items-center lg:gap-10
      lg:flex-row max-sm:text-sm gap-5"
      >
        <div className="max-w-md object-cover">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="h-50 rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="space-y-4">
          <h1 className="headerTitle px-0 no-underline">{article.title}</h1>
          <div className="flex divide-x-2 gap-2 max-sm:flex-col">
            <h2 className="font-semibold">
              By :{" "}
              <span className="font-normal dark:text-gray-300">
                {article.source.name}
              </span>
            </h2>
            <h2 className="font-semibold pl-4">
              Source :{" "}
              <a
                href={article.source.url}
                target="_blank"
                className="underline decoration-orange-400 
                underline-offset-4 font-normal dark:text-gray-300"
              >
                {article.source.url}
              </a>
            </h2>
            <p className="pl-4 font-semibold">
              Published At :{" "}
              <span className="font-normal dark:text-gray-300">
                {/*moment.js for date formatting*/}
                {moment(article.publishedAt).format("Do MMM YYYY")}
              </span>
            </p>
          </div>
          <p className="font-semibold">
            Description :{" "}
            <span className="font-normal dark:text-gray-300">
              {article.description}
            </span>
          </p>
        </div>
      </section>
      <div className="font-semibold max-sm:text-sm">
        Content :
        <p className="font-normal text-justify dark:text-gray-300">
          {article.content}
        </p>
      </div>
    </article>
  );
};

export default Article;
