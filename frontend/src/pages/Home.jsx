import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import {useState,useEffect} from "react"
import {searchMovies,getPopularMovies} from "../services/api";

function Home(){
    const[searchQuery, setSearchQuery]=useState("");
    const[movies,setMovies]=useState([]);
    const[error,setError]=useState(null);
    const[loading, setLoading]=useState(true);

    const [selectedGenre, setSelectedGenre] = useState("All");

    <select
  value={selectedGenre}
  onChange={(e) => setSelectedGenre(e.target.value)}
>
  <option value="All">All Movies</option>
  <option value="Action">Action</option>
  <option value="Drama">Drama</option>
  <option value="Romance">Romance</option>
  <option value="Comedy">Comedy</option>
  <option value="Thriller">Thriller</option>
</select>

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

    {error && <div className="error-message">{error}</div>}

       {loading ?( <div className="loading">Loading...</div>) : (
    <div className="movies-grid">
        {movies.map(movie=>(
            movie.title.toLowerCase().startsWith(searchQuery)&&( 
            <MovieCard key={movie.id} movie={movie} />)))}

        
    </div>
       )}
   </div>
       )

    
}

export default Home; 