import React from "react";
import "./FolderButton.css";

function FolderButton({ folderName, isClicked, onDoubleClick, onClick }) {
  return (
    <div id="folder-background" onClick={onClick} onDoubleClick={onDoubleClick}>
      <div className={`icon-background ${isClicked && "icon-clicked"}`}>
        <img id="folder-icon" src="/folder-icon.png"></img>
      </div>

      <div className={`name-background ${isClicked && "name-clicked"}`}>
        <p>{folderName}</p>
      </div>
    </div>
  );
}

export default FolderButton;
