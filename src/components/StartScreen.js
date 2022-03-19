import React from "react";

function StartScreen({ start, setStart }) {
  return <div onClick={() => setStart(true)}>StartScreen</div>;
}

export default StartScreen;
