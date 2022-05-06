import { useSelector } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss'

function MovieListing() {
  const movies = useSelector((state) => state.moviesReducer.movies)
  const shows = useSelector((state) => state.moviesReducer.shows)
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          {movies.length > 0 ? (
            movies.map((movie) => {
              return <MovieCard key={movie.imdbID} data={movie} />
            })
          ) : (
            <div className="movies-error">
              <h3>Loading...</h3>
            </div>
          )}
        </div>
      </div>

      <div className="show-list">
        <h2>Shows</h2>
        <div className="show-container">
          {shows.length > 0 ? (
            shows.map((show) => {
              return <MovieCard key={show.imdbID} data={show} />
            })
          ) : (
            <div className="movies-error">
              <h3>Loading...</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieListing
