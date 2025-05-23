import React, { useState } from "react";
import "./FolderWindow.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import AirDrop from "../assets/airdrop.svg";
import Recent from "../assets/recent.svg";
import AppStore from "../assets/app-store.svg";
import { IoIosDesktop } from "react-icons/io";
import { IoIosDocument } from "react-icons/io";
import { IoIosDownload } from "react-icons/io";
import { IoIosCloudOutline } from "react-icons/io";

function FolderWindow({ folderName, folderItems, closeFolder }) {
  const [clickedItem, setClickedItem] = useState(null);

  const [position, setPosition] = useState({ x: 250, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);

    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="folder-background"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="sidebar">
        {/* Open, minimise and close buttons */}
        <div
          className="side-top-part py-4 px-4 flex gap-x-2"
          onMouseDown={handleMouseDown}
        >
          {/* Close button */}
          <button
            className="w-3 h-3 rounded-full bg-red-400 cursor-pointer"
            onClick={closeFolder}
          ></button>
          <button className="w-3 h-3 rounded-full bg-yellow-400 cursor-auto"></button>
          <button className="w-3 h-3 rounded-full bg-green-400 cursor-auto"></button>
        </div>

        {/* Folder list */}
        <div className="folder-list mx-3">
          {/* Favourites list */}
          <h6 className="text-xs font-bold mb-1">Favourites</h6>
          <div className="favourites-list gap-y-1 ml-1">
            <div className="flex flex-row gap-x-1">
              <img src={AirDrop} alt="airdrop icon" />
              <p>AirDrop</p>
            </div>
            <div className="flex flex-row gap-x-1">
              <img src={Recent} alt="recent icon" />
              <p>Recent</p>
            </div>
            <div className="flex flex-row gap-x-1">
              <img src={AppStore} alt="applications icon" />
              <p>Applications</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <IoIosDesktop color="#007AFF" />
              <p>Desktop</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <IoIosDocument color="#007AFF" />
              <p>Documents</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <IoIosDownload color="#007AFF" />
              <p>Downloads</p>
            </div>
          </div>

          {/* iCloud list */}
          <h6 className="text-xs font-bold mb-1 mt-4">iCloud</h6>
          <div className="icloud-list gap-y-1 ml-1">
            <div className="flex flex-row items-center gap-x-1">
              <IoIosCloudOutline color="#00ffe1" />
              <p>iCloud Drive</p>
            </div>
          </div>

          {/* Tags list */}
          <h6 className="text-xs font-bold mb-1 mt-4">Tags</h6>
          <div className="icloud-list gap-y-1 ml-1">
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <p>Red</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
              <p>Orange</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <p>Yellow</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              <p>Green</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
              <p>Blue</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
              <p>Purple</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
              <p>Grey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="main-folder">
        {/* Top bar */}
        <div className="top-bar px-4" onMouseDown={handleMouseDown}>
          <div className="flex flex-row items-center">
            <div className="flex flex-row gap-x-3 mr-3">
              <IoIosArrowBack color="#BDBEC2" size={"22px"} />
              <IoIosArrowForward color="#BDBEC2" size={"22px"} />
            </div>
            {folderName == "projects" ? (
              <h6 className="font-bold">
                {folderName} - click on any image to be taken to website
              </h6>
            ) : (
              <h6 className="font-bold">{folderName}</h6>
            )}
          </div>

          <div className="ml-auto">
            <IoSearch color="#BDBEC2" size={"22px"} />
          </div>
        </div>

        {/* Folder content */}
        <div className="folder-content">
          {(folderItems || []).map(
            ([name, imgSrc, colour, url, info], index) => (
              <div
                key={index}
                className="individual-image"
                onClick={() => setClickedItem(index)}
              >
                <div
                  className={`image-background ${
                    clickedItem === index && "image-clicked"
                  }`}
                >
                  {folderName === "projects" ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <div className="h-14 w-14 flex items-center border-[2px] border-white bg-stone-300 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.2)] justify-center">
                        <img src={imgSrc} alt={name} />
                      </div>
                    </a>
                  ) : (
                    <div className="h-14 w-14 flex items-center justify-center">
                      <img src={imgSrc} alt={name} />
                    </div>
                  )}
                </div>

                <div
                  className={`item-name-background ${
                    clickedItem === index && "item-name-clicked"
                  } ${
                    folderName === "projects" &&
                    !name.includes("GitHub") &&
                    "projects-name"
                  }`}
                >
                  <button
                    className={`w-2.5 h-2.5 rounded-full cursor-auto ml-1 bg-${colour}-400`}
                  ></button>
                  <p>{name}</p>

                  <div className="project-info">{info}</div>
                </div>
              </div>
            )
          )}
        </div>

        {folderName !== "projects" ? (
          <div className="flex flex-col mt-auto mb-8 mx-10 text-start mt-6">
            <h6 className="text-s font-bold">Key</h6>
            <div>
              <button className="w-3 h-3 rounded-full bg-green-400 cursor-auto mr-1"></button>
              Green - high proficiency
            </div>
            <div>
              <button className="w-3 h-3 rounded-full bg-yellow-400 cursor-auto mr-1"></button>
              Yellow - medium proficiency
            </div>
            <div>
              <button className="w-3 h-3 rounded-full bg-orange-400 cursor-auto mr-1"></button>
              Orange - low proficiency
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-auto mb-8 mx-10 text-start mt-4">
            <h6 className="text-s font-bold">Key</h6>
            <div>
              <button className="w-3 h-3 rounded-full bg-green-400 cursor-auto mr-1"></button>
              Green - fully responsive
            </div>
            <div>
              <button className="w-3 h-3 rounded-full bg-yellow-400 cursor-auto mr-1"></button>
              Yellow - mostly responsive
            </div>
            <div>
              <button className="w-3 h-3 rounded-full bg-orange-400 cursor-auto mr-1"></button>
              Orange - non responsive (desktop only)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FolderWindow;
