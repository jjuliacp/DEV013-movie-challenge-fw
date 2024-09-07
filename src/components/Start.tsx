import React from "react";
import { LuPlaySquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "../styles/Start.css";

const Start: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="startView">
        <div className="start-header">
          <div className="logo-start">
            <LuPlaySquare className="logo-icon" />
            <h1 className="logo-text">Cinephile</h1>
          </div>
          <h1>Your access point to the world of entertainment</h1>
        </div>
        <button className="btnStart" onClick={goToHome}>
          Start
        </button>
      </div>
    </>
  );
};

export default Start;
