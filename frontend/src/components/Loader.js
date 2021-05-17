import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      variant="success"
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        display: "block",
      }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default Loader;
