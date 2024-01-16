import Link from "next/link";
import Navbar from "../components/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Fact } from "../components/Fact";
import { Edit } from "../components/edit";
import DeleteModal from "../components/deleteModal";

export default function MyFacts(factId) {
  const [loading, setLoading] = useState(false);
  const [factData, setFactData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchElement = async () => {
      try {
        const userId = localStorage.getItem("user");
        const response = await axios.get(
          `https://quizapp-backend-87e5.onrender.com/facts/${userId}`
        );
        console.log(response.data);
        setFactData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchElement();
  }, []);

  const handleEdit = (updatedFact) => {
    setFactData((prevFact) =>
      prevFact.map((fact) =>
        fact._id === updatedFact._id ? { ...fact, ...updatedFact } : fact
      )
    );
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          factData.map((fact) => (
            <div style={styles.fact}>
              <Fact fact={fact} factId={fact._id} />
              <div style={styles.editDiv}>
                <Edit factId={fact._id} edit={handleEdit} />
                {/* <DeleteFact factId={fact._id} /> */}
                <DeleteModal factId={fact._id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

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
    padding: "60px",
  },
  editDiv: {
    padding: "10px",
    display: "flex",
    gap: "10px",
  },
};
