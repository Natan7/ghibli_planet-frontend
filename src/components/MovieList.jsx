import { useEffect, useState } from "react";
import { getMovies } from "../utils/api";
import MovieCard from "./MovieCard";
import "../styles/movies.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Carregando filmes...</p>;

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.description.toLowerCase().includes(search.toLowerCase()) ||
    movie.release_date.includes(search)
  );

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar por título, sinopse ou ano..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="movies-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </div>
    </>
  );
};

export default MoviesList;
