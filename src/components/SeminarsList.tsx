import React, { useEffect, useState } from "react";

type Seminar = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
};

const SeminarsList: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSeminars = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/seminars");
        const data = await response.json();
        setSeminars(data);
      } catch (error) {
        console.error("Error fetching seminars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  const deleteSeminar = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this seminar?");
    if (confirmed) {
      try {
        await fetch(`http://localhost:5000/seminars/${id}`, { method: "DELETE" });
        setSeminars(seminars.filter((seminar) => seminar.id !== id));
      } catch (error) {
        console.error("Error deleting seminar:", error);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading seminars...</p>
      ) : (
        <ul>
          {seminars.map((seminar) => (
            <li key={seminar.id}>
              <h3>{seminar.title}</h3>
              <p>{seminar.description}</p>
              <p>
                {seminar.date} at {seminar.time}
              </p>
              <img src={seminar.photo} alt={seminar.title} width={200} />
              <button onClick={() => deleteSeminar(seminar.id)}>Delete</button>
              <button>Edit</button> {/* Placeholder for editing functionality */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeminarsList;
