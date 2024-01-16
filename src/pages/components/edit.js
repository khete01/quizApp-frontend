import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";

export function Edit({ factId, edit }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitle("");
    setText("");
  }, [factId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editFact = async () => {
    await axios.put(
      `https://quizapp-backend-87e5.onrender.com/facts/${factId}`,
      {
        title,
        text,
      }
    );
    edit({ _id: factId, title, text });
    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen} style={style.button}>
        Edit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style.box}>
          <input
            value={title}
            placeholder=" Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            value={text}
            placeholder=" Text"
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={editFact}>Edit</button>
        </div>
      </Modal>
    </div>
  );
}

const style = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "75px",
    gap: "5px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#303030",
    color: "white",
    color: "white",
    border: "1px solid black",
    borderRadius: "32px",
    width: "3vw",
  },
};
