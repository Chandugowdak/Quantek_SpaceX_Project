// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AllLaunches from "./Component/AllLaunches";
import UpcomingLaunches from "./Component/UpcomingLaunches";
import PastLaunches from "./Component/PastLaunches";

const App = () => {
  const [allLaunches, setAllLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then((res) => setAllLaunches(res.data))
      .catch((err) => console.error("Error loading all launches", err))
      .finally(() => setLoading(false));
  }, []);

  const renderLaunches = () => {
    if (filter === "upcoming")
      return <UpcomingLaunches onSelect={setSelectedLaunch} />;
    if (filter === "past") return <PastLaunches onSelect={setSelectedLaunch} />;
    return <AllLaunches launches={allLaunches} onSelect={setSelectedLaunch} />;
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🚀 SpaceX Launch Dashboard</h1>
      <div className="text-center mb-4">
        <div className="btn-group ">
          <button
            className={`btn  ${
              filter === "all" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn ${
              filter === "upcoming" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`btn ${
              filter === "past" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
        </div>
      </div>

      {loading && filter === "all" ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        renderLaunches()
      )}

      {selectedLaunch && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedLaunch.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedLaunch(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Launch Date:</strong>{" "}
                  {new Date(selectedLaunch.date_utc).toLocaleString()}
                </p>
                <p>
                  {selectedLaunch.details || "No further details available."}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedLaunch(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
