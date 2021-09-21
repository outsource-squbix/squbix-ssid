import React from "react";
import image from "../assets/demo.png";
const Home = () => {
  return (
    <div style={{ marginTop: "30vh" }}>
      <img
        src={image}
        alt="vc_icon"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <h1 style={{ textAlign: "center" }}>
        Welcome to the VC Generation Holder Portal
      </h1>
    </div>
  );
};

export default Home;
