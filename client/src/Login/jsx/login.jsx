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
} from "firebase/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        // ...
      });
  };

  const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        setUser(user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);

        // ...
      });
  };

  const handleGitHubLogin = () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      console.log("Email:", email);
      console.log("Felhasználónév:", username);
      console.log("Jelszó:", password);
      console.log("Jelszó Újra:", confirmPassword);
    } else {
      console.log("Felhasználónév:", username);
      console.log("Jelszó:", password);
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
            {isRegistering && (
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder={getText("register.email")}
                  className="login-input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            )}
            <div>
              <input
                type="text"
                id="username"
                placeholder={getText("login.username")}
                className="login-input"
                value={username}
                onChange={handleUsernameChange}
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
