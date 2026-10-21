import React, { useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "af55e318";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();

    const movieName = search.trim();

    if (!movieName) {
      setMovies([]);
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
        movieName
      )}&apikey=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to connect to the movie service.");
      }

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search || []);
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home-container">
      <section className="hero">
        <h1>Movie Explorer</h1>

        <p>Discover your next favourite movie</p>

        <form
          onSubmit={searchMovies}
          className="search-form"
        >
          <input
            type="text"
            placeholder="Enter a movie name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Movie name"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      <section className="results-section">
        {loading && (
          <h2 className="message">
            Loading movies...
          </h2>
        )}

        {!loading && error && (
          <h2 className="message error">
            {error}
          </h2>
        )}

        {!loading && movies.length > 0 && (
          <>
            <h2 className="section-title">
              Search Results
            </h2>

            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Home;