import React, { useRef } from "react";
import First from "./tsx/First.tsx";
import Information from "./tsx/Information.tsx";
import Footer from "./tsx/Footer.tsx";

const Home = () => {
  const informationRef = useRef(null);

  return (
    <div>
      <First scrollTargetRef={informationRef} />
      <Information ref={informationRef} />
      <Footer />
    </div>
  );
};

export default Home;
