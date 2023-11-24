import React from "react";

function TourList({ event }) {
  return (
    <div className="mt-4">
      <div className="container p-3 border">
        <div className="row">
          <div className="col-md-3">
            <h5 className="mb-1">{event.date}</h5>
          </div>
          <div className="col-md-3">
            <p className="mb-1">{event.location}</p>
          </div>
          <div className="col-md-3">
            <p className="mb-1">{event.venue}</p>
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center">
            <button className="btn btn-primary">BUY TICKETS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourList;
