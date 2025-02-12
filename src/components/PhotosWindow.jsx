import { useState } from "react";
import { IoIosPhotos } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";
import { IoIosMap } from "react-icons/io";
import { IoIosTime } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiMemoriesFill } from "react-icons/ri";
import { PiSuitcaseLight } from "react-icons/pi";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import "./PhotosWindow.css";
import { MdAspectRatio } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";

function PhotosWindow({ closePhotos }) {
  const sparkyPics = [
    "/sparky1.jpeg",
    "/sparky2.jpeg",
    "/sparky3.jpeg",
    "/sparky4.jpeg",
    "/sparky5.jpeg",
    "/sparky6.jpeg",
    "/sparky7.jpeg",
    "/sparky8.jpeg",
    "/sparky9.jpeg",
  ];

  const [position, setPosition] = useState({ x: 50, y: 50 });
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
      className="photos-background"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="sidebar" onMouseDown={handleMouseDown}>
        {/* Open, minimise and close buttons */}
        <div className="side-top-part py-4 px-4 flex gap-x-2">
          {/* Close button */}
          <button
            className="w-3 h-3 rounded-full bg-red-400 cursor-pointer"
            onClick={closePhotos}
          ></button>
          <button className="w-3 h-3 rounded-full bg-yellow-400 cursor-auto"></button>
          <button className="w-3 h-3 rounded-full bg-green-400 cursor-auto"></button>
        </div>

        {/* List */}
        <div className="folder-list mx-3">
          {/* Photos list */}
          <h6 className="text-xs font-bold mb-1">Photos</h6>
          <div className="favourites-list gap-y-1 ml-1">
            <div className="flex flex-row items-center gap-x-1">
              <IoIosPhotos color="#007AFF" />
              <p>Library</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <CiSaveDown2 color="#007AFF" />
              <p>Recently Saved</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <IoIosMap color="#007AFF" />
              <p>Map</p>
            </div>
          </div>

          {/* Collections list */}
          <h6 className="text-xs font-bold mb-1 mt-4">Collections</h6>
          <div className="icloud-list gap-y-1 ml-1">
            <div className="flex flex-row items-center gap-x-1">
              <IoIosTime color="#007AFF" />
              <p>Days</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <CgProfile color="#007AFF" />
              <p>People & Pets</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <RiMemoriesFill color="#007AFF" />
              <p>Memories</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <PiSuitcaseLight color="#007AFF" />
              <p>Trips</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <MdPhotoSizeSelectActual color="#007AFF" />
              <p>Featured Photos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="photos">
        <div className="top-bar px-4" onMouseDown={handleMouseDown}>
          <div className="flex flex-row items-center">
            <div className="flex flex-row gap-x-3 mr-3">
              <MdAspectRatio color="#BDBEC2" size={"20px"} />
            </div>
          </div>

          <div className="flex ml-auto gap-x-4 items-center">
            <h6 className="font-bold mr-2 text-[#BDBEC2]">9 photos</h6>
            <IoIosInformationCircleOutline color="#BDBEC2" size={"20px"} />
            <IoShareOutline color="#BDBEC2" size={"20px"} />
            <IoIosHeartEmpty color="#BDBEC2" size={"20px"} />
            <AiOutlineRotateLeft color="#BDBEC2" size={"20px"} />

            <div className="flex items-center justify-start w-60 h-7 border-1 border-zinc-700 rounded">
              <div className="flex flex-row ml-2">
                <IoSearch color="#BDBEC2" size={"18px"} />
                <p className="text-zinc-400">Search</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          <h2 className="font-bold text-[30px]">Recent</h2>
          <h6 className="font-bold text-[14px] text-zinc-400 pb-1">
            February 2025
          </h6>

          <div className="photos-content">
            {sparkyPics.map((imgSrc, index) => (
              <div
                key={index}
                className="w-65 h-65 overflow-hidden border-1 border-black"
              >
                <img
                  src={imgSrc}
                  className="w-full h-full object-cover"
                  alt={`Dog picture ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotosWindow;
