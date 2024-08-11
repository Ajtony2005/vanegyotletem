import React, { useState, useEffect } from "react";
import "../css/First.css";
import Navbar from "./Navbar.tsx";
import Readmore from "./Readmore.tsx";
import { animateScroll as scroll } from "react-scroll";
import Cookies from "js-cookie";
import texts from "../json/First.json";

const First = ({ scrollTargetRef }) => {
  const [redButtonClicked, setRedButtonClicked] = useState(false);
  const [greenButtonClicked, setGreenButtonClicked] = useState(false);
  const [readMoreClicked, setReadMoreClicked] = useState(false);
  const [language, setLanguage] = useState("hu");

  useEffect(() => {
    const storedLanguage = Cookies.get("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    const interval = setInterval(() => {
      const currentLanguage = Cookies.get("language");
      if (currentLanguage && currentLanguage !== language) {
        setLanguage(currentLanguage);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [language]);

  useEffect(() => {
    if (readMoreClicked) {
      scroll.scrollToBottom({
        smooth: true,
        container: scrollTargetRef.current,
      });
    }
  }, [readMoreClicked, scrollTargetRef]);

  const handleRedButtonClick = () => {
    setRedButtonClicked(true);
  };

  const handleGreenButtonClick = () => {
    setGreenButtonClicked(true);
  };

  const handleReadMoreClick = () => {
    setReadMoreClicked(true);
  };

  const getText = (key) => {
    return texts[language][key];
  };

  return (
    <div className="home">
      <Navbar />
      <div className="overlay">
        {redButtonClicked ? (
          <>
            <h1>{getText("redButtonClicked").title}</h1>
            <div className="spacer"></div>
            <div className="readmore-button">
              <Readmore onClick={handleReadMoreClick} />
            </div>
          </>
        ) : greenButtonClicked ? (
          <>
            <h1>{getText("greenButtonClicked").title}</h1>
            <div className="spacer"></div>
            <div className="readmore-button">
              <Readmore onClick={handleReadMoreClick} />
            </div>
          </>
        ) : (
          <>
            <h1>{getText("initial").title}</h1>
            <div className="spacer"></div>
            <button className="red-button" onClick={handleRedButtonClick}>
              <span className="icon">{getText("initial").redButton}</span>
            </button>
            <div className="spacer"></div>
            <button className="green-button" onClick={handleGreenButtonClick}>
              <span className="icon">{getText("initial").greenButton}</span>
            </button>
            <div className="spacer"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default First;
