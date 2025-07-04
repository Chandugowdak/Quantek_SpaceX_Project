// src/components/PastLaunches.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const PastLaunches = ({ onSelect }) => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches/past")
      .then((res) => setLaunches(res.data))
      .catch((err) => console.error("Error loading past launches", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-5">Loading past launches...</div>;

  return (
    <div className="row g-4">
      {launches.map((launch) => (
        <div className="col-12 col-sm-6 col-md-4" key={launch.id}>
          <div
            className="border rounded p-3 h-100 shadow-sm"
            onClick={() => onSelect(launch)}
            style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
          >
            {launch.links?.patch?.small && (
              <div className="text-center mb-3">
                <img
                  src={launch.links.patch.small}
                  alt={launch.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
              </div>
            )}
            <h5>{launch.name}</h5>
            <p className="text-muted mb-1">
              {new Date(launch.date_utc).toLocaleDateString()}
            </p>
            <p className="mb-0">
              {launch.details?.slice(0, 80) || "Loading Data..."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastLaunches;
