import { useEffect, useState } from "react";
import { getMovies } from "../utils/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import MovieCard from "./MovieCard";
import "../styles/movieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [filters, setFilters] = useState({
    watched: false,
    favorite: false,
    hasNote: false,
    hasRating: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies();
      const updatedMovies = data.map(movie => ({
        ...movie,
        personal_rating: parseFloat(localStorage.getItem(`rating-${movie.id}`) || 0),
        watched: localStorage.getItem(`watched-${movie.id}`) === "true",
        favorite: localStorage.getItem(`favorite-${movie.id}`) === "true",
        hasNote: localStorage.getItem(`comment-${movie.id}`)?.trim() !== "",
      }));

      setMovies(updatedMovies);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Carregando filmes...</p>;

  const filteredMovies = movies.filter(movie => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.description.toLowerCase().includes(search.toLowerCase()) ||
      movie.release_date.includes(search);

    const matchesFilters =
      (!filters.watched || movie.watched) &&
      (!filters.favorite || movie.favorite) &&
      (!filters.hasNote || movie.hasNote) &&
      (!filters.hasRating || movie.personal_rating > 0);

    return matchesSearch && matchesFilters;
  });

  // Função para ordenar filmes
  const sortedMovies = sortOption === "none" ? filteredMovies : [...filteredMovies].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "duration-asc":
        return a.running_time - b.running_time;
      case "duration-desc":
        return b.running_time - a.running_time;
      case "rating-asc":
        return localStorage.getItem(`rating-${a.id}`) - localStorage.getItem(`rating-${b.id}`);
      case "rating-desc":
        return localStorage.getItem(`rating-${b.id}`) - localStorage.getItem(`rating-${a.id}`);
      case "rt-score-asc":
        return a.rt_score - b.rt_score;
      case "rt-score-desc":
        return b.rt_score - a.rt_score;
      default:
        return 0;
    }
  });

  const handleFilterChange = (filterKey) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }));
  };

  const clearFilters = () => {
    setSearch("");
    setSortOption("none");
    setFilters({
      watched: false,
      favorite: false,
      hasNote: false,
      hasRating: false,
    });
  };

  const areFiltersActive =
        sortOption !== "none" ||
        search.trim() !== "" ||
        filters.watched ||
        filters.favorite ||
        filters.hasNote ||
        filters.hasRating;
  
  return (
    <>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Buscar por título, sinopse ou ano..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {areFiltersActive && (
          <Button
            className="clear-filters-btn"
            variant="secondary"
            onClick={clearFilters}
          >
            Limpar Filtros
          </Button>
        )}
      </div>

      {/* Dropdown para ordenação */}
      <div className="filter-container">
        <label>Ordenar por:</label>
        <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
          <option value="none">Sem ordenação</option>
          <option value="title-asc">Título (A-Z)</option>
          <option value="title-desc">Título (Z-A)</option>
          <option value="duration-asc">Duração (Curto → Longo)</option>
          <option value="duration-desc">Duração (Longo → Curto)</option>
          <option value="rating-asc">Minha Avaliação (Menor → Maior)</option>
          <option value="rating-desc">Minha Avaliação (Maior → Menor)</option>
          <option value="rt-score-asc">Nota Geral (Menor → Maior)</option>
          <option value="rt-score-desc">Nota Geral (Maior → Menor)</option>
        </Form.Select>

        <label>
          <input type="checkbox" checked={filters.watched} onChange={() => handleFilterChange("watched")} />
          Assistido
        </label>
        <label>
          <input type="checkbox" checked={filters.favorite} onChange={() => handleFilterChange("favorite")} />
          Favoritos
        </label>
        <label>
          <input type="checkbox" checked={filters.hasNote} onChange={() => handleFilterChange("hasNote")} />
          Com Anotação
        </label>
        <label>
          <input type="checkbox" checked={filters.hasRating} onChange={() => handleFilterChange("hasRating")} />
          Com Minha Avaliação
        </label>
      </div>

      {sortedMovies.length > 0 ? (
        <div className="movies-container">
          {
            sortedMovies.map(movie => 
                <MovieCard key={movie.id} movie={movie} />
            )
          }
        </div>
      ) : (
        <p className="no-movies">Nenhum filme encontrado.</p>        
      )}
    </>
  );
};

export default MovieList;
