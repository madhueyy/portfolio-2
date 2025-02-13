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
        "Botaniq",
        "/botaniq.png",
        "green",
        "https://botaniq-seven.vercel.app/",
        "Made with: TypeScript, React & Material UI.\n\nAn indoor plant shopping website. Allows users to browse, sort, and search a variety of plants. Implemented dynamic plant filtering by cateogires such as price, popularity, and reviews. Designed individual plant detail pages with a checkout flow, leveraging state management to handle selected items efficiently.",
      ],
      [
        "Fruit Focus",
        "/fruit-focus.png",
        "yellow",
        "https://fruit-focus-frontend.vercel.app/",
        "Made with: TypeScript, React & Mantine UI.\n\nAn interactive website to help users identify seasonal fruits based on their geographic location within Australia. Implemented a search functionality that allows users to find specific fruits by name, nutrient content or seasonality. Integrated detailed fruit profiles displaying macro and micronutrient information.",
      ],
      [
        "Old Portfolio",
        "/old-portfolio.png",
        "yellow",
        "https://madhus-portfolio.vercel.app/",
        "Made with: HTML, CSS, Bootstrap, JavaScript & GSAP.\n\nA portfolio website with smooth scrolling navigation with GSAP scroll-triggered animations. Note: website is not updated",
      ],
      [
        "Pomodoro Timer",
        "/pomodoro.png",
        "orange",
        "https://pomodoro-timer-eight-theta.vercel.app/",
        "Made with: HTML, CSS & JavaScript.\n\nA user-friendly pomodoro timer to enhance productivity and time management using the Pomodoro study technique. Implemented features allowing users to start, stop and adjust the timer while setting daily productivity goals. Integrated a streak tracking system to encourage engagement by celebrating consecutive days of achieving daily goals.",
      ],
      [
        "Botaniq GitHub",
        "/github.webp",
        "green",
        "https://github.com/madhueyy/botaniq",
      ],
      [
        "Fruit Focus GitHub",
        "/github.webp",
        "yellow",
        "https://github.com/madhueyy/fruit-focus-frontend",
      ],
      [
        "Portfolio GitHub",
        "/github.webp",
        "yellow",
        "https://github.com/madhueyy/portfolio",
      ],
      [
        "Pomodoro GitHub",
        "/github.webp",
        "orange",
        "https://github.com/madhueyy/pomodoro-timer",
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
