import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import {useState,useEffect} from "react"
import {
  searchMovies,
  getPopularMovies,
  genres,
} from "../services/api";

function Home(){
    const[searchQuery, setSearchQuery]=useState("");
    const[movies,setMovies]=useState([]);
    const[error,setError]=useState(null);
    const[loading, setLoading]=useState(true);

    const [selectedGenre, setSelectedGenre] = useState("All");



    useEffect(()=>{
    const loadPopularMovies=async()=>{
        try{
            const popularMovies=await getPopularMovies();
            setMovies(popularMovies);
        }
        catch(error){
            setError("Failed to load Movies... Please try again later.");
        }
        finally{
            setLoading(false);

        }
    }
    loadPopularMovies();

   },[])

    const handleSearch = async(e)=>{
        e.preventDefault();
       if (!searchQuery.trim()) return
       if (loading) return
       setLoading(true)
       try{
        const searchResults=await searchMovies(searchQuery)
        setMovies(searchResults);
        setError(null);

       }catch(err){
        console.log(err)
        setError("Failed to search movies... Please try again later.")
       }finally{
        setLoading(false)
       }


    }  

    const filteredMovies =
  selectedGenre === "All"
    ? movies
    : movies.filter((movie) =>
        movie.genre_ids.includes(genres[selectedGenre])
      );

       return (
   <div className="home">
    <form onSubmit={handleSearch} className="search-form">
        <input type="text" 
        placeholder="Search movies..." 
        className="search-input" 
        value={searchQuery} 
        onChange={(e)=>setSearchQuery(e.target.value)}/>
        <button type="submit" className="search-button">Search</button>
       </form>




       <div className="genre-filter">
  <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
  >
    <option value="All">All Movies</option>
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="Animation">Animation</option>
    <option value="Comedy">Comedy</option>
    <option value="Crime">Crime</option>
    <option value="Drama">Drama</option>
    <option value="Family">Family</option>
    <option value="Fantasy">Fantasy</option>
    <option value="Horror">Horror</option>
    <option value="Romance">Romance</option>
    <option value="ScienceFiction">Science Fiction</option>
    <option value="Thriller">Thriller</option>
  </select>
</div>




    {error && <div className="error-message">{error}</div>}

       {loading ?( <div className="loading">Loading...</div>) : (
    <div className="movies-grid">
       {filteredMovies
  .filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ))}

        
    </div>
       )}
   </div>
       )

    
}

export default Home; 