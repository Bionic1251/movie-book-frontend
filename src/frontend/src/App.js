import { useEffect, useState } from "react";
import "./css/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";

import { Movie } from "./Movie";
import { Book } from "./Book";
import Ratings from "./Ratings";
import Wishlist from "./WishList";

import SearchPage from "./SearchPage";

import MainPage from "./MainPage";

const App = () => {
  const [page, setPage] = useState("movies");

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${page}`);
  }, [page]);

  const handleChange = () => {
    if (page === "movies") setPage("books");
    else setPage("movies");
  };

  return (
    <div class="page">
      <Routes>
        <Route
          path="/:page"
          element={<MainPage page={page} handleChange={handleChange} />}
        />
        <Route path="/:page/ratings" element={<Ratings />} />
        <Route path="/:page/wishlist" element={<Wishlist />} />
        <Route path="/:page/search" element={<SearchPage page={page} />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/*" element={<MainPage page={page} />} />
      </Routes>
    </div>
  );
};

export default App;
