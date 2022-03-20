import React from "react";
const characters = [
  { name: "Yoda", x: 53, y: 25 },
  { name: "Test", x: 15, y: 22 },
];

// ? For handling clicks, check:
// ? https://github.com/airbnb/react-outside-click-handler
// ? https://github.com/KFig21/photo_tagging_app/blob/main/src/pages/Game.js

function Game({ currentCharacter }) {
  function verifyCorrectClick(x, y, character) {
    // Receives X and Y, checks with character X and Y
  }
  function getClickCoordinates(e) {
    // Gets coordinates X and Y of where the person clicked.
  }
  return <div>GamePicture</div>;
}

export default Game;
