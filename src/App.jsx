import { useState, useEffect } from "react";
import "./App.css";
import TopBar from "./components/TopBar";
import FolderButton from "./components/FolderButton";
import FolderWindow from "./components/FolderWindow";
import BottomBar from "./components/BottomBar";
import NotesWindow from "./components/NotesWindow";
import MailWindow from "./components/MailWindow";
import SafariWindow from "./components/SafariWindow";
import PhotosWindow from "./components/PhotosWindow";
import Launchpad from "./components/Launchpad";

function App() {
  const [clickedFolder, setClickedFolder] = useState(null);
  const [doubleClickedFolder, setDoubleClickedFolder] = useState(null);
  const [openApps, setOpenApps] = useState(["Notes"]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  // const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  // Fake loading progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setIsLoading(false);
            // setShowWelcomeScreen(true);
          }, 500);

          return 100;
        }

        return oldProgress + Math.random() * 20;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (showWelcomeScreen) {
  //     setTimeout(() => setShowWelcomeScreen(false), 3000);
  //   }
  // }, [showWelcomeScreen]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <img
          src="/bar-apple-logo.png"
          alt="Apple Logo"
          className="apple-logo"
        />
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  // if (showWelcomeScreen) {
  //   return (
  //     <div className="welcome-screen">
  //       <h1 className="welcome-text">welcome</h1>
  //     </div>
  //   );
  // }

  const folders = {
    languages: [
      ["JavaScript.js", "/JavaScript.png", "green"],
      ["TypeScript.ts", "/TypeScript.webp", "green"],
      ["Java.java", "/Java.webp", "green"],
      ["Python.py", "/Python.png", "green"],
      ["C.c", "/C.png", "yellow"],
      ["Bash.sh", "/Bash.png", "orange"],
      ["MIPS.mips", "/MIPS.svg", "orange"],
    ],
    "frameworks-libraries": [
      ["React.jsx", "/React.png", "green"],
      ["Bootstrap", "/Bootstrap.png", "green"],
      ["TailwindCSS", "/Tailwind.png", "green"],
      ["MaterialUI", "/MaterialUI.svg", "green"],
      ["MantineUI", "/MantineUI.png", "yellow"],
      ["ExpressJS", "/ExpressJS.png", "green"],
      ["Flask", "/Flask.png", "yellow"],
      ["GSAP", "/GSAP.png", "orange"],
    ],
    projects: [
      [
        "Presto",
        "/presto.png",
        "green",
        "https://presto-deploy-frontend-c64mv5wyo-madhus-projects-75aff4a4.vercel.app/",
      ],
      [
        "Botaniq",
        "/botaniq.png",
        "yellow",
        "https://botaniq-seven.vercel.app/",
      ],
      [
        "Fruit Focus",
        "/fruit-focus.png",
        "yellow",
        "https://fruit-focus-frontend.vercel.app/",
      ],
      [
        "Old Portfolio",
        "/old-portfolio.png",
        "yellow",
        "https://madhus-portfolio.vercel.app/",
      ],
      [
        "Pomodoro Timer",
        "/pomodoro.png",
        "orange",
        "https://pomodoro-timer-eight-theta.vercel.app/",
      ],
    ],
  };

  const closeFolder = () => {
    setClickedFolder(null);
    setDoubleClickedFolder(null);
  };

  const closeNotes = () => {
    setOpenApps((prev) => prev.filter((app) => app !== "Notes"));
  };

  const closeMail = () => {
    setOpenApps((prev) => prev.filter((app) => app !== "Mail"));
  };

  const closeSafari = () => {
    setOpenApps((prev) => prev.filter((app) => app !== "Safari"));
  };

  const closePhotos = () => {
    setOpenApps((prev) => prev.filter((app) => app !== "Photos"));
  };

  const closeLaunchpad = () => {
    setOpenApps((prev) => prev.filter((app) => app !== "Launchpad"));
  };

  const toggleApp = (appName) => {
    setOpenApps((prev) =>
      prev.includes(appName)
        ? prev.filter((app) => app !== appName)
        : [...prev, appName]
    );
  };

  return (
    <>
      <TopBar />
      <div className="main-app">
        {/* Open folder window if double clicked respective folder */}
        {doubleClickedFolder && (
          <FolderWindow
            folderName={clickedFolder}
            folderItems={folders[clickedFolder]}
            closeFolder={closeFolder}
          />
        )}

        {/* Open app windows */}
        {openApps.includes("Notes") && <NotesWindow closeNotes={closeNotes} />}
        {openApps.includes("Mail") && <MailWindow closeMail={closeMail} />}
        {openApps.includes("Safari") && (
          <SafariWindow closeSafari={closeSafari} />
        )}
        {openApps.includes("Photos") && (
          <PhotosWindow closePhotos={closePhotos} />
        )}
        {openApps.includes("Launchpad") && (
          <Launchpad toggleApp={toggleApp} closeLaunchpad={closeLaunchpad} />
        )}

        {/* Folders on right side */}
        <div className="folders">
          {Object.keys(folders).map((folderName) => (
            <FolderButton
              key={folderName}
              folderName={folderName}
              isClicked={clickedFolder === folderName}
              onDoubleClick={() => setDoubleClickedFolder(folderName)}
              onClick={() => setClickedFolder(folderName)}
            />
          ))}
        </div>

        <div className="bottom-bar">
          <BottomBar openApps={openApps} toggleApp={toggleApp} />
        </div>
      </div>
    </>
  );
}

export default App;
