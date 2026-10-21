import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="movie-link"
    >
      <div className="movie-card">
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/300x450/222222/ffffff?text=No+Poster"
          }
          alt={movie.Title}
          className="movie-poster"
        />

        <div className="movie-info">
          <h3>{movie.Title}</h3>

          <p>📅 Year: {movie.Year}</p>

          <p className="click-text">
            Click to explore details →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;