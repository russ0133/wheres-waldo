import React from "react";
const levelOne = require("../img/image1.jpg");
interface StartScreenNode {
  setStart: (value: boolean) => void;
}

const StartScreen: React.FC<StartScreenNode> = ({ setStart }) => {
  return (
    <>
      <div className="StartScreen-Title text-4xl font-bold text-slate-600">
        Choose your Level
      </div>
      <div className="Levels flex flex-row flex-wrap h-full w-screen items-center align-bottom justify-evenly">
        <div className="Level-One flex flex-col items-center">
          <div className="Level-One-Title text-xl font-bold text-slate-600 mb-3 underline">
            Level One
          </div>
          <img
            src={levelOne}
            className="Level-One-Image w-72 h-3/4 bg-red-400 rounded-xl shadow-lg cursor-pointer transition ease-in-out hover:scale-105"
            onClick={() => setStart(true)}
          />
        </div>
        {/* 
        <div className="Level-One flex flex-col items-center">
          <div className="Level-One-Title text-xl font-bold text-slate-600 mb-3 underline">
            Level Two
          </div>
          <img
            src={levelOne}
            className="Level-One-Image w-72 h-3/4 bg-red-400 rounded-xl shadow-lg cursor-pointer transition ease-in-out hover:scale-105"
            onClick={() => setStart(true)}
          />
        </div>

        <div className="Level-One flex flex-col items-center">
          <div className="Level-One-Title text-xl font-bold text-slate-600 mb-3 underline">
            Level Three
          </div>
          <img
            src={levelOne}
            className="Level-One-Image w-72 h-3/4 bg-red-400 rounded-xl shadow-lg cursor-pointer transition ease-in-out hover:scale-105"
            onClick={() => setStart(true)}
          />
        </div> */}
      </div>
    </>
  );
  {
    /* <div onClick={() => setStart(true)}>StartScreen</div>; */
  }
};

export default StartScreen;
