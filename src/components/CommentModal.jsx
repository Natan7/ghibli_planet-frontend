import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CommentModal = ({ movieId, show, handleClose, updateComment }) => {
  const storageKey = `comment-${movieId}`;
  const [comment, setComment] = useState("");

  useEffect(() => {
    const savedComment = localStorage.getItem(storageKey);
    if (savedComment) {
      setComment(savedComment);
    }
  }, [storageKey]);

  const handleSave = () => {
    if (comment.trim() === "") {
      return;
    }
    localStorage.setItem(storageKey, comment);
    updateComment(comment); // Atualiza a anotação no MovieCard
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Anotação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escreva sua anotação aqui..."
          className="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={comment.trim() === ""}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
