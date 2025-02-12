import { useState, useEffect } from "react";
import "./Launchpad.css";

function Launchpad({ toggleApp, closeLaunchpad }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsActive(true), 10);
    return () => setIsActive(false);
  }, []);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(closeLaunchpad, 300);
  };

  const apps = [
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
    Safari: "w-20 h-20",
    Mail: "w-21 h-21",
    Photos: "w-21 h-21",
    Notes: "w-20 h-20",
    LinkedIn: "w-21 h-21",
    GitHub: "w-23 h-23",
  };

  const openApp = (appName) => {
    toggleApp(appName);
    handleClose();
  };

  return (
    <div className={`launchpad-background ${isActive ? "active" : ""}`}>
      <div className="launchpad">
        {apps.map(([appName, iconSrc, link]) => (
          <div key={appName} className="flex flex-col items-center gap-y-1">
            {/* App Icon */}
            <img
              src={iconSrc}
              alt={appName}
              className={`${iconSizes[appName] || "w-13 h-13"}`}
              onClick={() =>
                link ? window.open(link, "_blank") : openApp(appName)
              }
            />
            <div>{appName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Launchpad;
