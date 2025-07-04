import React from "react";
import { Col, Row } from "react-bootstrap";

const AllLaunches = ({ launches, onSelect }) => (
  <Row xs={1} sm={2} md={3} className="g-4">
    {launches.map((launch) => (
      <Col key={launch.id}>
        <div
          className="border rounded p-4  m-3 h-100 shadow-sm launch-box"
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
            {launch.details?.slice(0, 80) || "Data Loading..."}
          </p>
        </div>
      </Col>
    ))}
  </Row>
);

export default AllLaunches;
