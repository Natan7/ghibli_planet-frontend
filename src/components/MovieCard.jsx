import { useState } from "react";
import { Rating } from "@mui/material";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { FaCheck, FaEye, FaHeart, FaRegHeart, FaEdit, FaPlus } from "react-icons/fa";
import { toggleFavorite, toggleWatched, updateRating, updateMovieComment } from "../redux/actions";
import { useDispatch } from "react-redux";

import CommentModal from "./CommentModal";
import "../styles/movieCard.css";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  
  // Estados locais apenas para feedback visual (toast) e controle do modal
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 5000);
  };

  // Atualiza a avaliação pessoal via Redux
  const handleRatingChange = (newValue) => {
    const newRating = newValue * 20;
    dispatch(updateRating(movie.id, newRating));
    showToast("✔ Avaliação atualizada!", "success");
  };

  // Alterna o status "Assistido" via Redux
  const handleWatchedToggle = () => {
    dispatch(toggleWatched(movie.id));
    showToast(
      movie.watched ? "ⓧ Removido de Assistidos" : "✔ Marcado como Assistido",
      movie.watched ? "danger" : "success"
    );
  };

  // Alterna o status "Favorito" via Redux
  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(movie.id));
    showToast(
      movie.favorite ? "ⓧ Removido dos Favoritos" : "✔ Adicionado aos Favoritos",
      movie.favorite ? "danger" : "success"
    );
  };

  // Atualiza a anotação via Redux
  const updateComment = (newComment) => {
    dispatch(updateMovieComment(movie.id, newComment));
    showToast("Anotação salva!", "success");
  };

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-image" />

      <h2>
        {movie.title} ({movie.release_date})
      </h2>

      <div className="subtitle">
        <Rating className="custom-rating" value={movie.rt_score / 20} readOnly max={1} />
        {movie.rt_score}% &middot; {movie.running_time} minutos
      </div>

      <div className="subtitle">
        <strong>Diretor:</strong> &nbsp; {movie.director}
      </div>

      <div className="subtitle">
        <strong>Produtor:</strong> &nbsp; {movie.producer}
      </div>

      <p style={{ marginTop: "20px" }}>{movie.description}</p>

      {movie.comment && (
        <div className="comment-display">
          <strong>Anotação:</strong>
          <p>{movie.comment}</p>
        </div>
      )}

      <CommentModal 
        movieId={movie.id} 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        updateComment={updateComment} 
      />

      <div className="bottom-container">
        <div className="rating-line">
          <span>Avaliação:</span>
          <Rating 
            className="custom-rating"
            name="half-rating"
            value={(movie.personal_rating ?? 0) / 20} 
            onChange={(event, newValue) => handleRatingChange(newValue)}
            precision={0.5} 
          />
        </div>

        <div className="annotation-line">
          <Button 
            className="annotation-btn action-btn w-100" 
            variant="primary" 
            onClick={() => setShowModal(true)}
          >
            <span className="btn-content">
              {movie.comment ? (
                <>
                  <FaEdit style={{ marginRight: "5px" }} />
                  Editar Anotação
                </>
              ) : (
                <>
                  <FaPlus style={{ marginRight: "5px" }} />
                  Adicionar Anotação
                </>
              )}
            </span>
          </Button>
        </div>

        <div className="action-line">
          <Button
            className="action-btn"
            variant={movie.watched ? "success" : "secondary"}
            onClick={handleWatchedToggle}
          >
            <span className="btn-content">
              {movie.watched ? (
                <>
                  <FaCheck/>
                  <span>Assistido</span>
                </>
              ) : (
                <>
                  <FaEye/>
                  <span>Marcar como Assistido</span>
                </>
              )}
            </span>
          </Button>

          <Button
            className="action-btn"
            variant={movie.favorite ? "danger" : "secondary"}
            onClick={handleFavoriteToggle}
          >
            <span className="btn-content">
              {movie.favorite ? (
                <>
                  <FaHeart style={{ marginRight: "5px" }} />
                  Favorito
                </>
              ) : (
                <>
                  <FaRegHeart style={{ marginRight: "5px" }} />
                  Ad. Favorito
                </>
              )}
            </span>
          </Button>
        </div>
      </div>

      {toastMessage && (
        <Toast className={`toast-container ${toastType === "success" ? "toast-success" : "toast-danger"} show`}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default MovieCard;
