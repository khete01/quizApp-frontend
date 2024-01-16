import { useEffect, useState } from "react";
import axios from "axios";

export function Fact({ fact }) {
  const [userId, setUserId] = useState([]);
  const [likesCount, setLikesCount] = useState(fact.likes.length);
  const [dislikesCount, setDislikesCount] = useState(fact.dislikes.length);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const getUserId = () => {
      const userId = localStorage.getItem("user");
      setUserId(userId);
    };

    getUserId();
    setLiked(fact.likes.includes(userId));
    setDisliked(fact.dislikes.includes(userId));
  }, [fact, userId]);

  const updateLikes = async () => {
    if (!liked) {
      try {
        await axios.post(
          `https://quizapp-backend-87e5.onrender.com/likes/${fact._id}/${userId}`
        );
        setLikesCount(likesCount + 1);
        setLiked(true);
        if (disliked) {
          setDislikesCount(dislikesCount - 1);
          setDisliked(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateDislikes = async () => {
    if (!disliked) {
      try {
        await axios.post(
          `https://quizapp-backend-87e5.onrender.com/dislikes/${fact._id}/${userId}`
        );
        setDislikesCount(dislikesCount + 1);
        setDisliked(true);
        if (liked) {
          setLikesCount(likesCount - 1);
          setLiked(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div style={styles.facts}>
      <div style={styles.title}>
        <h2 style={styles.text}>{fact.title}</h2>
        <p>{fact.id}</p>
        <p>{fact.date}</p>
      </div>
      <div style={styles.textDiv}>
        <p style={styles.text}>{fact.text}</p>
      </div>
      <div style={styles.reactDiv}>
        <button style={styles.like} onClick={updateLikes} disabled={liked}>
          <img src="/like.png" />
          <p style={styles.text}>{likesCount}</p>
        </button>
        <button
          style={styles.like}
          onClick={updateDislikes}
          disabled={disliked}
        >
          <img src="/dislike.png" />
          <p style={styles.text}>{dislikesCount}</p>
        </button>
      </div>
    </div>
  );
}

const styles = {
  title: {
    display: "flex",
    gap: "20px",
    height: "50px",
    width: "100vw",
  },
  like: {
    display: "flex",
    gap: "10px",
    border: "1px solid grey",
    borderRadius: "10px",
    width: "60px",
    height: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  reactDiv: {
    display: "flex",
    gap: "40px",
  },
  facts: {
    padding: "20px",
  },
  textDiv: {
    width: "100vw",
    height: "50px",
  },
};
