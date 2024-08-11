import React, { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import text from "../json/signin.json";
import Cookies from "js-cookie";

const SignInButton = () => {
  const [clicked, setClicked] = useState(false);
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

  const getText = (key) => {
    return text[language][key];
  };

  const handleClick = () => {
    setClicked(!clicked);
    window.location.href = "/login";
  };

  return (
    <button
      className="btn btn-outline-warning btn-sm btn-block"
      onClick={handleClick}
    >
      <LoginIcon /> {getText("text")}
    </button>
  );
};

export default SignInButton;
