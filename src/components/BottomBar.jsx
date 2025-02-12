import { useState } from "react";
import "./BottomBar.css";

function BottomBar({ openApps, toggleApp }) {
  const [hoveredApp, setHoveredApp] = useState(null);

  const apps = [
    ["Finder", "/finder-icon.png"],
    ["Launchpad", "/launchpad.webp"],
    ["Safari", "/safari.png"],
    ["Mail", "/mail.webp"],
    ["Photos", "/photos.webp"],
    ["Notes", "/notes.png"],
    [
      "LinkedIn",
      "/linkedin.webp",
      "https://www.linkedin.com/in/madhu-shrestha/",
    ],
    ["GitHub", "/github.png", "https://github.com/madhueyy"],
  ];

  const iconSizes = {
    Finder: "w-15 h-15 mx-3",
    Launchpad: "w-15 h-15 mx-3",
    Safari: "w-13 h-13 mx-3",
    Mail: "w-14 h-14 mx-3",
    Photos: "w-14 h-14 mx-3",
    Notes: "w-13 h-13 mx-3",
    LinkedIn: "w-14 h-14 mx-3",
    GitHub: "w-16 h-16 mx-2",
  };

  return (
    <div className="bottom-bar-background">
      <div className="flex items-center">
        {apps.map(([appName, iconSrc, link]) => (
          <div
            key={appName}
            className="app flex flex-col items-center gap-y-1"
            onMouseEnter={() => setHoveredApp(appName)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {/* Tooltip */}
            <div className={"tooltip"}>{appName}</div>

            {/* App Icon */}
            <img
              src={iconSrc}
              alt={appName}
              className={`${iconSizes[appName] || "w-13 h-13"}`}
              onClick={() =>
                link ? window.open(link, "_blank") : toggleApp(appName)
              }
            />
            <div
              className={`h-1 w-1 rounded-full ${
                (appName === "Finder" || openApps.includes(appName)) &&
                "bg-white"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomBar;
