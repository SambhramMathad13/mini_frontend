import React from "react";
import { Link } from "react-router-dom";

function _404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="text-center">
        <img
          src="/Page not found.png" // Ensure this path is correct relative to your project structure
          alt="Page not found"
          className="mx-auto mb-8"
          style={{ maxWidth: "100vw", height: "100vh" }}
        />
      </div>
    </div>
  );
}

export default _404;
