import Link from "next/link";
import Navbar from "../../components/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Fact } from "../../components/Fact";
import { Edit } from "../../components/edit";
import DeleteModal from "../../components/deleteModal";

function MyFacts(factId) {
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
        const sortedData = response.data.sort(
          (a, b) => b.likes.length - a.likes.length
        );
        console.log(response.data);
        setFactData(sortedData);
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

  const handleDelete = (deletedFactId) => {
    setFactData((prevFact) =>
      prevFact.filter((fact) => fact._id !== deletedFactId)
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
                <DeleteModal factId={fact._id} onDelete={handleDelete} />
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

export default MyFacts;
