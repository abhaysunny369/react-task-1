import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "af55e318";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      setError("");
      setMovie(null);

      try {
        const url = `https://www.omdbapi.com/?i=${encodeURIComponent(
          id
        )}&plot=full&apikey=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Unable to connect to the movie service.");
        }

        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(
            data.Error || "Unable to load movie details."
          );
        }
      } catch (err) {
        setError(
          err.message ||
            "Network error. Please check your internet connection."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getMovie();
    } else {
      setError("Movie ID is missing.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <h2 className="message">
          Loading movie details...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <h2 className="message error">
          {error}
        </h2>

        <Link to="/" className="back-button">
          ← Back to Search
        </Link>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="details-container">
      <Link to="/" className="back-button">
        ← Back to Search
      </Link>

      <div className="details-card">
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/300x450?text=No+Poster"
          }
          alt={movie.Title}
          className="details-poster"
        />

        <div className="details-info">
          <h1>{movie.Title}</h1>

          <p>
            <strong>Release Year:</strong>{" "}
            {movie.Year || "N/A"}
          </p>

          <p>
            <strong>IMDb Rating:</strong>{" "}
            ⭐ {movie.imdbRating || "N/A"}
          </p>

          <p>
            <strong>Genre:</strong>{" "}
            {movie.Genre || "N/A"}
          </p>

          <p>
            <strong>Director:</strong>{" "}
            {movie.Director || "N/A"}
          </p>

          <p>
            <strong>Actors:</strong>{" "}
            {movie.Actors || "N/A"}
          </p>

          <p>
            <strong>Runtime:</strong>{" "}
            {movie.Runtime || "N/A"}
          </p>

          <p>
            <strong>Language:</strong>{" "}
            {movie.Language || "N/A"}
          </p>

          <p>
            <strong>Awards:</strong>{" "}
            {movie.Awards || "N/A"}
          </p>

          <h3>Plot Summary</h3>

          <p>
            {movie.Plot && movie.Plot !== "N/A"
              ? movie.Plot
              : "Plot summary not available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;