import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";

const DeleteModal = ({ factId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteFact = async () => {
    await axios.delete(
      `https://quizapp-backend-87e5.onrender.com/delete/${factId}`
    );
    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen} style={style.button}>
        Delete
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style.box}>
          <button onClick={deleteFact} style={style.yes}>
            Yes
          </button>
          <button onClick={handleClose} style={style.no}>
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

const style = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    height: "90px",
    gap: "5px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    borderRadius: "30px",
    width: "5vw",
    border: "1px solid black",
  },
  yes: { backgroundColor: "red", height: "40px" },
  no: {
    height: "40px",
  },
};

export default DeleteModal;
