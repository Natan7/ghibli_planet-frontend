import { useSelector } from 'react-redux';

const MovieFilter = ({ onFilterChange }) => {
  const favorites = useSelector(state => state.favorites || []);
  const watched = useSelector(state => state.watched || []);
  
  // Resto do seu código de filtro...
  
  // Quando filtrar por favoritos, use o estado do Redux
  const handleFavoriteFilter = () => {
    onFilterChange(movie => favorites.includes(movie.id));
  };
  
  // Quando filtrar por assistidos, use o estado do Redux
  const handleWatchedFilter = () => {
    onFilterChange(movie => watched.includes(movie.id));
  };
  
  // Resto do seu código...
}