import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Fact } from "../components/Fact";

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
  },
  text: {
    color: "black",
  },
  fact: {
    width: "80vw",
    border: "1px solid black",
    borderRadius: "20px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "50px",
    display: "grid",
    gridTemplateColumns: "auto",
    padding: "40px",
  },
};

function HomePage({ fact }) {
  const [userData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        router.replace("/login");
      }
    };

    const fetchElement = async () => {
      const response = await axios.get(
        "https://quizapp-backend-87e5.onrender.com/facts"
      );

      const sortedData = response.data.sort(
        (a, b) => b.likes.length - a.likes.length
      );
      setData(sortedData);
      setLoading(false);
    };

    isUserLoggedIn();
    setLoading(true);
    fetchElement();
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.content}>
          {userData.map((fact) => (
            <div key={fact._id} style={styles.fact}>
              <Fact fact={fact} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
