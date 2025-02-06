import React from "react";
import "./App.css";
import SeminarsList from "./components/SeminarsList";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Seminars List</h1>
      <SeminarsList />
    </div>
  );
};

export default App;
