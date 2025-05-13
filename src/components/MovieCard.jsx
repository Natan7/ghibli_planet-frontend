import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { FaCheck, FaEye, FaHeart, FaRegHeart, FaEdit, FaPlus } from "react-icons/fa";

import CommentModal from "./CommentModal"; 
import "../styles/movieCard.css";

const MovieCard = ({ movie }) => {
  const storageKeyRating = `rating-${movie.id}`;
  const storageKeyWatched = `watched-${movie.id}`;
  const storageKeyFavorite = `favorite-${movie.id}`;
  const storageKeyComment = `comment-${movie.id}`;

  const [rating, setRating] = useState(() =>
    localStorage.getItem(storageKeyRating)
      ? parseFloat(localStorage.getItem(storageKeyRating))
      : 0
  );
  const [watched, setWatched] = useState(() =>
    localStorage.getItem(storageKeyWatched) === "true"
  );
  const [favorite, setFavorite] = useState(() =>
    localStorage.getItem(storageKeyFavorite) === "true"
  );
  const [comment, setComment] = useState(
    () => localStorage.getItem(storageKeyComment) || ""
  );
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // Define a cor do toast
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKeyRating, rating);
    localStorage.setItem(storageKeyWatched, watched);
    localStorage.setItem(storageKeyFavorite, favorite);
  }, [rating, watched, favorite]);

  useEffect(() => {
    localStorage.setItem(storageKeyComment, comment);
  }, [comment]);

  const updateComment = (newComment) => {
    setComment(newComment);
    localStorage.setItem(storageKeyComment, newComment);
    showToast("Anotação salva!", "success");
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 5000);
  };

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-image" />
      <h2>
        {movie.title} ({movie.release_date})
      </h2>
      <div className="subtitle">
        <Rating value={movie.rt_score / 20} readOnly max={1} />
        {movie.rt_score}% &middot; {movie.running_time} minutos
      </div>
      <div className="subtitle">
        <strong>Diretor:</strong> &nbsp; {movie.director}
      </div>
      <div className="subtitle">
        <strong>Produtor:</strong> &nbsp; {movie.producer}
      </div>
      <p style={{ marginTop: "20px" }}>{movie.description}</p>

      {comment && (
        <div className="comment-display">
          <strong>Anotação:</strong>
          <p>{comment}</p>
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
            name={`rating-${movie.id}`} 
            value={rating / 20} 
            onChange={(event, newValue) => {
              setRating(newValue * 20);
              showToast("Avaliação atualizada!", "success");
            }}
            precision={0.5} 
          />
        </div>

        <div className="annotation-line">
          <Button 
            className="annotation-btn w-100" 
            variant="primary" 
            onClick={() => setShowModal(true)}
          >
            {comment ? (
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
          </Button>
        </div>

        <div className="action-line">
          <Button
            className="action-btn"
            variant={watched ? "success" : "secondary"}
            onClick={() => {
              setWatched(!watched);
              showToast(
                watched
                  ? "Removido de Assistidos"
                  : "Marcado como Assistido",
                watched ? "danger" : "success"
              );
            }}
          >
            {watched ? (
              <>
                <FaCheck style={{ marginRight: "5px" }} />
                Assistido
              </>
            ) : (
              <>
                <FaEye style={{ marginRight: "5px" }} />
                Marcar como Assistido
              </>
            )}
          </Button>

          <Button
            className="action-btn"
            variant={favorite ? "danger" : "secondary"}
            onClick={() => {
              setFavorite(!favorite);
              showToast(
                favorite
                  ? "ⓧ Removido dos Favoritos"
                  : "✔ Adicionado aos Favoritos",
                favorite ? "danger" : "success"
              );
            }}
          >
            {favorite ? (
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
