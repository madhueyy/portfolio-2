import React from "react";
import "./TopBar.css";

function TopBar() {
  return (
    <div id="bar-background">
      <div id="left-bar">
        <div id="logo-part">
          <img id="bar-apple-logo" src="../public/bar-apple-logo.png"></img>
          <div className="button">Finder</div>
        </div>

        <div className="button no-bold">File</div>
        <div className="button no-bold">Edit</div>
        <div className="button no-bold">View</div>
        <div className="button no-bold">Go</div>
        <div className="button no-bold">Window</div>
        <div className="button no-bold">Help</div>
      </div>
    </div>
  );
}

export default TopBar;
