import { useState, useEffect } from 'react'
import './css/App.css';
import {
  Routes, Route, Link, useMatch
} from "react-router-dom"

import axios from 'axios'

import Movie from './Movie'
import Ratings from './Ratings';
import Wishlist from './WishList';

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
    <div class='movie-list'>
      {movies.map(movie => 
        <div  class='movie-pic' key={movie.id} >
          <Link to={`/movie/${movie.movieid}`}>
          <a href="/"></a><img src={"https://image.tmdb.org/t/p/original"+movie.posterpath} width={120} height={"auto"} img/>
          </Link>
        </div>)}
      
    </div>
    <Search />
  </div>
)


const Search = () => (
  <form action="/search" method="GET">
      <label for="search">Search movies </label>
      <input type="search" id ="search" name="query" placeholder="Search movies"/>
      <button type="submit" value="submit">Search</button>
  </form>
)

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
