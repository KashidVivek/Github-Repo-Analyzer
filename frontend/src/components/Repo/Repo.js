import React from "react";
import "./Repo.css";

const Repo = ({ data }) => {
  const getScore = (repo) => {
    fetch(`repo/${repo.id}`)
      .then((res) => res.json())
      .then((data) => {
        const path = `https://img.shields.io/badge/Autodevtech-${data.repoScore}-orange?style=for-the-badge&logo=appveyor`;
        window.open(path, "_blank");
      });
  };
  return (
    <div className="card">
      <img
        src="https://img.icons8.com/wired/64/000000/repository.png"
        alt="Repo"
      />
      <div className="card-text" onClick={() => getScore(data)}>
        <p>
          {data.name} {data.private && <span>Private</span>}
        </p>
      </div>
      <div className="options">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Repo;
