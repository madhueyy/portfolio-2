import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { TiTabsOutline } from "react-icons/ti";
import "./SafariWindow.css";

function SafariWindow({ closeSafari }) {
  const [showIframe, setShowIframe] = useState(false);

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
            onClick={() => setShowIframe(false)}
            className="cursor-pointer"
          />
          <IoIosArrowForward color="#BDBEC2" size={"21px"} />
        </div>

        <div className="flex items-center justify-center mx-auto w-120 h-7 bg-zinc-800/80 rounded">
          {showIframe ? (
            <div>
              <p className="text-zinc-400">fruit-focus-frontend.vercel.app</p>
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
        {showIframe ? (
          <iframe
            src="https://fruit-focus-frontend.vercel.app/"
            width="100%"
            height="100%"
            title="Fruit Focus"
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
                <img src="/apple-safari.png" className="w-28 h-28"></img>
                <p>Apple</p>
              </div>
              <div
                className="fruit-focus-safari cursor-pointer"
                onClick={() => setShowIframe(true)}
              >
                <img
                  src="/fruit-focus-safari.png"
                  className="w-17.5 h-17.5 ml-6 mt-6 mb-5"
                ></img>
                <p>Fruit Focus</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SafariWindow;
