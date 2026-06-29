import { useEffect, useState } from "react";
import { getMovieCredits } from "../services/api";
import "../css/MovieDetailModal.css";

function MovieDetailModal({ movie, onClose }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll lock when modal is open
    document.body.style.overflow = "hidden";
    
    // Escape key listener to close modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Fetch credits/cast
    const fetchCredits = async () => {
      try {
        setLoading(true);
        const castData = await getMovieCredits(movie.id);
        // Slice top 8 cast members
        setCast(castData.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error("Error fetching movie credits:", err);
        setError("Failed to load cast information.");
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();

    return () => {
      // Re-enable scroll when modal is closed
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movie.id, onClose]);

  // Handle overlay click to close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Backdrop Image Section */}
        <div className="modal-hero">
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt=""
              className="modal-backdrop-img"
            />
          ) : (
            <div className="modal-backdrop-placeholder" />
          )}
          <div className="modal-hero-overlay" />
          <div className="modal-hero-title-container">
            <h2>{movie.title}</h2>
            <p className="modal-meta">
              {movie.release_date?.split("-")[0]} • ★ {movie.vote_average?.toFixed(1)} / 10
            </p>
          </div>
        </div>

        {/* Modal Info Section */}
        <div className="modal-body">
          <div className="modal-main-info">
            {/* Poster and Basic Details */}
            <div className="modal-poster-side">
              <img
                src={`https://image.tmdb.org/t/p/w340${movie.poster_path}`}
                alt={movie.title}
                className="modal-poster-img"
              />
            </div>
            
            {/* Overview / Storyline */}
            <div className="modal-details-side">
              <h3>Storyline</h3>
              <p className="modal-overview">
                {movie.overview || "No description available for this movie."}
              </p>
            </div>
          </div>

          {/* Cast Section */}
          <div className="modal-cast-section">
            <h3>Key Characters & Cast</h3>
            {loading && <div className="modal-loading-cast">Loading cast...</div>}
            {error && <div className="modal-error-cast">{error}</div>}
            
            {!loading && !error && cast.length === 0 && (
              <p className="no-cast-message">No cast information available.</p>
            )}

            {!loading && !error && cast.length > 0 && (
              <div className="modal-cast-grid">
                {cast.map((actor) => (
                  <div key={actor.id} className="cast-card">
                    <div className="cast-profile-wrapper">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="cast-profile-img"
                        />
                      ) : (
                        <div className="cast-profile-placeholder">
                          {actor.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div className="cast-info">
                      <span className="cast-actor-name">{actor.name}</span>
                      <span className="cast-character-name">as {actor.character}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailModal;
