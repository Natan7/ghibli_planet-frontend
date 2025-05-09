const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-image" />
      <h2>{movie.title} ({movie.release_date})</h2>
      <p><strong>Duração:</strong> {movie.running_time} minutos</p>
      <p><strong>Diretor:</strong> {movie.director}</p>
      <p><strong>Produtor:</strong> {movie.producer}</p>
      <p><strong>Nota:</strong> {movie.rt_score}/100</p>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieCard;
