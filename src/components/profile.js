import React, { useState, useEffect } from "react";
import axios from "axios";
import { style } from "motion";

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      try {
        const response = await axios.get(
          "https://quizapp-backend-87e5.onrender.com/user",
          {
            params: {
              userId,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setUserData(response.data);
          console.log(response.data);
        } else {
          setUserData([response.data]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  return (
    <div style={styles.sidebar}>
      <p style={style.text}>{userId}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData.map((el) => (
          <div style={style.textDiv}>
            <p style={style.text}>{el.username}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  sidebar: {
    position: "absolute",
    height: "300px",
    width: "250px",
    top: "0",
    boxShadow: "2px 2px 3px 3px #ccc",
    boxSizing: "border-box",
    padding: "20px 30px",
    background: "white",
  },
  button: {
    color: "black",
    width: "30px",
    height: "30px",
  },
  text: {},
  textDiv: {},
};
