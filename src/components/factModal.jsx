import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "80px",
    gap: "5px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    color: "white",
    border: "1px solid #AAAAAA",
    borderRadius: "32px",
    width: "120px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#303030",
  },
};

const CreateFact = (factId) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createFact = async () => {
    const userId = localStorage.getItem("user");
    await axios.post("https://quizapp-backend-87e5.onrender.com/facts", {
      userId,
      title,
      text,
    });

    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen} style={style.button}>
        Create Fact
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style.box}>
          <input
            placeholder="  Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="  Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={createFact}>Create</button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateFact;
