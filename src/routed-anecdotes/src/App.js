import { useState, useEffect } from 'react'
import './App.css';
import './index.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from "react-router-dom"

import axios from 'axios'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/wishlist">wishlist</Link>
        <Link style={padding} to="/ratings">ratings</Link>
      </div>
    </div>
  )
}

const Movies = ({ movies }) => (
  <div class="page-container">
  <h2>movies</h2>
    <div class='page-container'>
      {movies.map(movie => 
        <div key={movie.id} >
          <Link to={`/movie/${movie.movieid}`}>
          {movie.title}
          </Link>
        </div>)}
      
    </div>
    <Search />
    <Pictures />
  </div>
)

const Ratings = () => (
  <div class="page-container">
    <h2>MyRatings</h2>
  </div>
)

const Wishlist = () => (
  <div class="page-container">
    <h2>WishList</h2>
  </div>
)


const Search = () => (
  <form action="/search" method="GET">
      <label for="search">Search movies </label>
      <input type="search" id ="search" name="query" placeholder="Search movies"/>
      <button type="submit" value="submit">Search</button>
  </form>
)

const Pictures = () => (
  <div class="movie-list">
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
  </div>
)

const Movie = ({ movie }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
    </div>
  )
}


const App = () => {
  const [movies, setMovies] = useState([])  
  useEffect(() => {    axios
    .get('http://128.214.253.51:3000/dbgettop10moviesbyyear?year=2020')
    .then(response => {
      setMovies(response.data)
    })
}, []);

const match = useMatch('/movie/:id')
const movie = match 
  ? movies.find(movie => movie.movieid === Number(match.params.id))
  : null


  const padding = {
    padding: 5
  }


  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Movies movies={movies} />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/movie/:id" element={<Movie movie={movie} />} />
      </Routes>

    </div>
  )
}

export default App
