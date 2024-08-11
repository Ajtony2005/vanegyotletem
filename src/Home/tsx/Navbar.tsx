import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import SignInButton from "./SignInButton.tsx";
import { HU, GB } from "country-flag-icons/react/3x2";
import Cookies from "js-cookie";

const Navbar = () => {
  const [language, setLanguage] = useState(
    () => Cookies.get("language") || "hu"
  );

  useEffect(() => {
    const storedLanguage = Cookies.get("language");
    if (storedLanguage && storedLanguage !== language) {
      setLanguage(storedLanguage);
    }
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    Cookies.set("language", lang, { expires: 30 });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <ul className="navbar-items">
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}logo.png`} // Használj VITE_PUBLIC_URL-t
          alt="VEHO Logo"
          className="logo"
          onClick={reloadPage}
        />
        <div className="navbar-right">
          <ul className="navbar-items-right">
            <li>
              <button
                className="flag-button"
                onClick={() => changeLanguage("hu")}
              >
                <HU
                  title="Magyarország"
                  style={{ width: "40px", height: "auto" }}
                />
              </button>
            </li>
            <li>
              <button
                className="flag-button"
                onClick={() => changeLanguage("en")}
              >
                <GB
                  title="United Kingdom"
                  style={{ width: "40px", height: "auto" }}
                />
              </button>
            </li>
            <li>
              <SignInButton />
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
