import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SignInButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <button className="btn btn-outline-success" onClick={handleClick}>
      Read more
    </button>
  );
};

export default SignInButton;
