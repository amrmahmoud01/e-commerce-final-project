import React from "react";

export default function loading() {
  return (
    <div className="h-screen">
      <div className="flex items-center h-full justify-center">
        <span className="loader"></span>
      </div>
    </div>
  );
}
