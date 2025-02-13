import { useState } from "react";
import { IoIosFolder } from "react-icons/io";
import "./NotesWindow.css";
import { IoIosList } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoText } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

function NotesWindow({ closeNotes }) {
  const noteContent = [
    [
      "Welcome to my portfolio! 🍀",
      "Double click any of the folders to the right to see my skills and projects ☺️ \n \nOR\n \nCheck out the other notes to the left where you can read about me and a guide for the apps below 😊 \n \n \n— This website was made using React and TailwindCSS and is based on the macOS Sequoia system :) —",
    ],
    [
      "About Me ✨",
      "Name: Madhu Shrestha 😁\nDegree: Software Engineering 🤓 \nHobbies: \n* Anything astronomy related 🪐 \n* Making websites 💻 \n* Taking 256 pictures of my dog per day 🐶 \nCurrent occupation: Tutor 👩‍🏫 (year 7 - 12 maths, science & software) \nCurrently working on: \n* Uni courses 🙃 \n* OA prep - LeetCode & HackerRank 😭 \n* Trying to learn Vue & React Native \n* Trying to learn AWS & Docker \nInterests: frontend, full stack, AI",
    ],
    [
      "Website App Guide 🧐",
      "Launchpad - use this to see all the apps in a maximised view\nSafari - click on any of the icons to see my projects' UI/UX designs I've made in Figma 👩‍🎨\nMail - use this app to give any feedback you have for the website (bugs, good things, bad things, improvements etc.)\nPhotos - pictures of my dog 😆\nNotes - the app you’re on right now 🤩\nLinkedIn - takes you to my LinkedIn profile\nGitHub - takes you to my GitHub profile",
    ],
  ];

  const [selectedNote, setSelectedNote] = useState(noteContent[0]);

  const [position, setPosition] = useState({ x: 20, y: 40 });
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
      className="notes-background"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="sidebar">
        <div
          className="side-top-part py-4 px-4 flex gap-x-2"
          onMouseDown={handleMouseDown}
        >
          {/* Close button */}
          <button
            className="w-3 h-3 rounded-full bg-red-400 cursor-pointer"
            onClick={closeNotes}
          ></button>
          <button className="w-3 h-3 rounded-full bg-yellow-400 cursor-auto"></button>
          <button className="w-3 h-3 rounded-full bg-green-400 cursor-auto"></button>
        </div>

        {/* iCloud notes list */}
        <div className="icloud-notes mx-2">
          <h6 className="text-xs font-bold mb-1">iCloud</h6>
          <div className="flex flex-row h-6 items-center gap-x-1 pl-1 bg-yellow-500/70 rounded">
            <IoIosFolder color="white" />
            <p>Notes</p>
            <p id="notes-num">3</p>
          </div>
        </div>
      </div>

      <div className="notes">
        <div className="top-bar px-4 bg-zinc-700" onMouseDown={handleMouseDown}>
          <div className="flex flex-row items-center">
            <div className="flex flex-row gap-x-3 mr-3">
              <IoIosList color="#BDBEC2" size={"22px"} />

              <div className="flex flex-row gap-x-5 ml-26">
                <IoTrashOutline color="#BDBEC2" size={"22px"} />
                <div className="vl"></div>
                <PiNotePencil color="#BDBEC2" size={"22px"} />
                <IoText color="#BDBEC2" size={"20px"} />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-x-3 ml-auto">
            <IoShareOutline color="#BDBEC2" size={"22px"} />
            <IoSearch color="#BDBEC2" size={"22px"} />
          </div>
        </div>

        <div className="notes-list-content">
          <div className="notes-list">
            <h6 className="text-xs font-bold text-zinc-400 my-1 ml-3">Today</h6>
            <hr></hr>

            <div className="notes-list-options">
              {noteContent.map(([title, preview], index) => (
                <div
                  key={index}
                  className={`note-preview ${
                    selectedNote[0] === title ? "bg-yellow-500/65" : ""
                  }`}
                  onClick={() => setSelectedNote([title, preview])}
                >
                  <h6 className="text-[14px] font-bold ml-1">
                    {title.slice(0, 24)}
                  </h6>

                  <div
                    className={`flex flex-row mb-2 ${index == 2 ? "pb-2" : ""}`}
                  >
                    <p className="text-[10px]">Today</p>
                    <p className="text-[10px] text-zinc-400">
                      {preview.slice(0, 16)}
                    </p>
                  </div>
                  <hr className={`${index == 2 ? "hidden" : ""}`}></hr>
                </div>
              ))}
            </div>
          </div>

          <div className="note-content">
            <p className="note-date">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* Mobile warning */}
            <div className="mobile-warning">
              <h2 className="text-xl font-bold ml-1 mb-4">
                ❗️❗️ Attention Mobile Users ❗️❗️
              </h2>
              <p className="note">
                This website is best used with desktop and it looks like you are
                on tablet/mobile.
                <br></br>
                <br></br>
                For better performance, please use desktop or refer to my old
                portfolio website (not fully updated):{" "}
                <a>https://madhus-portfolio.vercel.app/</a>
              </p>
            </div>

            {/* Normal notes for desktop users */}
            <div className="desktop-notes">
              <h2 className="text-xl font-bold ml-1 mb-4">{selectedNote[0]}</h2>
              <p className="note">{selectedNote[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesWindow;
