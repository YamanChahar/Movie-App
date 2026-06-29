import "./App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider, useMovieContext } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import ScrollingBackground from "./components/ScrollingBackground";
import MovieDetailModal from "./components/MovieDetailModal";

function AppContent() {
  const { selectedMovie, setSelectedMovie } = useMovieContext();

  return (
    <>
      <ScrollingBackground />
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}

export default App;
