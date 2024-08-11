import React, { useState, useEffect } from "react";
import "../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import texts from "../json/login.json";
import Cookies from "js-cookie";
import { auth } from "../../firebase";
import {
  getAuth,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ContactMailOutlined } from "@mui/icons-material";

const Login = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("hu");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Új állapotváltozó a sikeres regisztrációhoz

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
    const keys = key.split(".");
    let textValue = texts[language];
    for (const k of keys) {
      if (textValue[k] === undefined) {
        return key; // Return the key as a fallback
      }
      textValue = textValue[k];
    }
    return textValue;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleGitHubLogin = () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    setError("");
    setSuccessMessage(""); // A sikeres üzenetet kiürítjük minden beküldésnél

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (isRegistering) {
      if (!passwordRegex.test(password)) {
        setError(
          "A jelszónak tartalmaznia kell legalább 8 karaktert, minimum 1 nagybetűt és 1 számot."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError("A jelszavak nem egyeznek meg.");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          setSuccessMessage("Sikeres regisztráció!"); // Beállítjuk a sikeres regisztrációs üzenetet
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === "auth/email-already-in-use") {
            setError("Ez az email cím már használatban van");
          } else {
            setError(errorMessage);
            console.log(errorMessage);
            console.log(errorCode);
          }
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;

          if (error.code === "auth/invalid-credential") {
            setError(
              "A hitelesítési adatok érvénytelenek. Kérjük, ellenőrizze a beírt adatokat."
            );
          } else if (errorCode === "auth/user-not-found") {
            setError(
              "Még nincs fiókod ezzel az email címmel. Kérjük, regisztrálj!"
            );
          } else if (errorCode === "auth/wrong-password") {
            setError("Helytelen jelszó!");
          } else {
            setError(errorMessage);
            console.log(errorMessage);
            console.log(errorCode);
          }
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h1>
              {isRegistering
                ? getText("register.title")
                : getText("login.title")}
            </h1>
            {error && <div className="error-message">{error}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}{" "}
            {/* A sikeres üzenet megjelenítése */}
            <div>
              <input
                type="email"
                id="email"
                placeholder={getText("login.email")}
                className="login-input"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={getText("login.password")}
                className="login-input"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {isRegistering && (
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder={getText("register.confirmPassword")}
                  className="login-input"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            )}
            <button type="submit" className="login-button">
              {isRegistering
                ? getText("register.submit")
                : getText("login.submit")}
            </button>
            <div className="login-buttons">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="login-button-google"
              >
                <FontAwesomeIcon icon={faGoogle} />
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="login-button-facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button
                type="button"
                onClick={handleGitHubLogin}
                className="login-button-github"
              >
                <FontAwesomeIcon icon={faGithub} />
              </button>
            </div>
            <div className="register-link">
              <p>
                {isRegistering
                  ? getText("register.hasAccount")
                  : getText("login.noAccount")}
                <a href="#" onClick={toggleForm}>
                  {isRegistering
                    ? getText("register.loginHere")
                    : getText("login.registerHere")}
                </a>
              </p>
              <p>{user?.displayName}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
