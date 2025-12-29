// components/Modal.js
import React from "react";

const CommentModal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  // Close the modal when clicking outside of the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <button onClick={closeModal} style={styles.closeButton}>
          X
        </button>
        <div>Hi</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.3s ease", // Optional fade-in animation
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "5px",
    position: "relative",
    width: "400px",
    maxWidth: "100%",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional box shadow
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default CommentModal;
