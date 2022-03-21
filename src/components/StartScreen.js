import React from "react";

function StartScreen({ start, setStart }) {
  return (
    <>
      <div className="text-4xl font-bold text-slate-600">Choose your Level</div>
      <div className="flex flex-row h-full w-screen items-center align-bottom justify-evenly">
        <div
          className="w-72 h-3/4 bg-red-400 rounded-xl shadow-lg cursor-pointer transition ease-in-out hover:scale-105"
          onClick={() => setStart(true)}
        >
          Image 1
        </div>
        <div
          className="w-72 h-3/4 bg-blue-400 rounded-xl shadow-lg cursor-pointer transition ease-in-out hover:scale-105"
          onClick={() => setStart(true)}
        >
          Image 2
        </div>
        <div
          className="w-72 h-3/4 bg-green-400 rounded-xl shadow-lg cursor-pointer transition ease-in-out hover:scale-105"
          onClick={() => setStart(true)}
        >
          Image 3
        </div>
      </div>
    </>
  );
  {
    /* <div onClick={() => setStart(true)}>StartScreen</div>; */
  }
}

export default StartScreen;
