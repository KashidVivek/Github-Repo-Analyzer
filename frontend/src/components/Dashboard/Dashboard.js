import React, { useState, useEffect } from "react";
import Repo from "../Repo/Repo.js";
import "./Dashboard.css";

const Dashboard = () => {
  const [state, setState] = useState();
  const [filterRepoState, setFilterRepoState] = useState("");
  const [filterDisplay, setFilterDisplay] = useState();
  useEffect(() => {
    fetch("/dashboard")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data.userData);
        setFilterDisplay(data.userData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (newFilter) => {
    let oldList = state.map((repo) => repo);
    if (newFilter !== "") {
      console.log(newFilter);
      const newList = oldList.filter((repo) => {
        repo.name.toString().toLowerCase().includes(filterRepoState);
      });
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(state);
    }
  };

  return (
    <div className="container">
      <div className="search">
        <i className="fa fa-search searchIcon"></i>
        <input
          type="text"
          value={filterRepoState}
          placeholder="Filter repositories"
          onChange={(e) => {
            setFilterRepoState(e.target.value);
            handleFilter(e.target.value);
          }}
        />
      </div>

      {filterDisplay &&
        filterDisplay.map((repo, idx) => (
          <div key={idx}>
            <Repo data={repo} />
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
