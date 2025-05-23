import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { TiTabsOutline } from "react-icons/ti";
import "./SafariWindow.css";

function SafariWindow({ closeSafari }) {
  const [selectedIframe, setSelectedIframe] = useState(null);

  const [position, setPosition] = useState({ x: 10, y: 40 });
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
      className="safari-background"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="top-bar bg-zinc-700" onMouseDown={handleMouseDown}>
        <div className="side-top-part py-4 px-4 flex gap-x-2">
          {/* Close button */}
          <button
            className="w-3 h-3 rounded-full bg-red-400 cursor-pointer"
            onClick={closeSafari}
          ></button>
          <button className="w-3 h-3 rounded-full bg-yellow-400 cursor-auto"></button>
          <button className="w-3 h-3 rounded-full bg-green-400 cursor-auto"></button>
        </div>
        <div className="flex flex-row gap-x-2">
          <IoIosArrowBack
            color="#BDBEC2"
            size={"21px"}
            onClick={() => setSelectedIframe(null)}
            className="cursor-pointer"
          />
          <IoIosArrowForward color="#BDBEC2" size={"21px"} />
        </div>

        <div className="flex items-center justify-center mx-auto w-120 h-7 bg-zinc-800/80 rounded">
          {selectedIframe ? (
            <div>
              <p className="text-zinc-400">www.figma.com</p>
            </div>
          ) : (
            <div className="flex">
              <IoSearch color="#BDBEC2" />
              <p className="text-zinc-400">Search or enter website name</p>
            </div>
          )}
        </div>
        <div className="flex gap-x-4 mr-4">
          <IoShareOutline color="#BDBEC2" size={"22px"} />
          <IoIosAdd color="#BDBEC2" size={"22px"} />
          <TiTabsOutline color="#BDBEC2" size={"22px"} />
        </div>
      </div>

      <div className="safari">
        {selectedIframe ? (
          <iframe
            src={selectedIframe}
            allowFullScreen
            width="100%"
            height="100%"
            title="Figma"
          ></iframe>
        ) : (
          <div className="favourites">
            <h2 className="font-bold text-[22px]">Favourites</h2>
            <div className="flex">
              <div className="text-center">
                <img src="/google.webp" className="w-28 h-28"></img>
                <p>Google</p>
              </div>

              <div className="text-center">
                <img src="/apple-safari.webp" className="w-28 h-28"></img>
                <p>Apple</p>
              </div>

              <div
                className="fruit-focus-safari cursor-pointer"
                onClick={() =>
                  setSelectedIframe(
                    "https://embed.figma.com/design/jFadqUyKAE4zOSHPjEMbO5/DEVT2-Bard?node-id=109-105&embed-host=share"
                  )
                }
              >
                <img
                  src="/fruit-focus-safari.png"
                  className="w-17.5 h-17.5 ml-6 mt-6 mb-5"
                ></img>
                <p>Fruit Focus Figma</p>
              </div>

              <div
                className="botaniq-safari cursor-pointer"
                onClick={() =>
                  setSelectedIframe(
                    "https://embed.figma.com/design/SUuqqbwXmjCK7WGqbdSnFe/Planterior?node-id=0-1&embed-host=share"
                  )
                }
              >
                <img
                  src="/planterior-icon.png"
                  className="w-17.5 h-17.5 ml-3.5 mt-6 mb-5"
                ></img>
                <p>Planterior Figma</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SafariWindow;
