import React, { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { characters } from "../utils/characters";

import puzzleImage from "../img/image1.jpg";
import isBetweenXDegrees from "../utils/isBetweenXDegrees";

function Game({ seconds, finishGame, setIsActive }) {
  const [clicked, setClicked] = useState(false);
  const [coords, setCoords] = useState(null);

  const clickRef = useRef(null); // ? The DOM element that shows the target box.
  const characterRef = useRef(null); // ? The DOM element that shows the character selection box.

  useEffect(() => {
    setIsActive(true);
  }, []);

  function verifyCorrectClick(x, y, characterName) {
    const found = characters.find(
      (character) => character.name == characterName
    );
    if (isBetweenXDegrees(characterName, x, y)) console.log("right");
    found.isFound = true;

    if (isGameOver()) {
      alert(`You won the game in ${seconds} seconds.`);
      finishGame();
    } else alert(`Found character ${found.name} in ${seconds} seconds.`);
    // Verifies if x and y matches found.x and found.y within a deviation of degrees
  }

  function isGameOver() {
    const found = characters.filter((character) => character.isFound == false);
    console.log(found);
    if (found.length == 0) return true;
    else return false;
  }

  function getClickCoordinates(e) {
    const offsetX = e.nativeEvent.offsetX;
    const offsetWidth = e.nativeEvent.target.offsetWidth;

    const offsetY = e.nativeEvent.offsetY;
    const offsetHeight = e.nativeEvent.target.offsetHeight;

    const xCoord = Math.round((offsetX / offsetWidth) * 100);
    const yCoord = Math.round((offsetY / offsetHeight) * 100);

    const coords = { xCoord, yCoord };
    setCoords(coords);

    return console.log(coords);
  }

  const displayTargetBox = (event) => {
    clickRef.current.classList =
      "border-8 border-blue-900 shadow-lg border-double absolute rounded-lg w-12 h-12";

    clickRef.current.style.left = event.pageX - 24 + "px";
    clickRef.current.style.top = event.pageY - 24 + "px";
  };

  const displayCharacterList = (event) => {
    characterRef.current.classList =
      "shadow-lg border-double absolute rounded-md w-max h-max bg-neutral-200 animate-bounce hover:animate-none";

    characterRef.current.style.left = event.pageX + 32 + "px";
    characterRef.current.style.top = event.pageY - 24 + "px";
  };

  const handleClick = async (event) => {
    const click = await setClicked(true);
    displayCharacterList(event);
    displayTargetBox(event);
    getClickCoordinates(event);
  };

  return (
    <div className="cursor-crosshair">
      {clicked && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setClicked(false);
            setCoords(null);
          }}
        >
          <div ref={clickRef}></div>
          <ul ref={characterRef}>
            {characters.map((character, index) => (
              <li
                key={index}
                onClick={() => {
                  verifyCorrectClick(
                    coords["xCoord"],
                    coords["yCoord"],
                    character.name
                  );
                }}
                className={
                  "px-2 text-center font-bold noselect " +
                  (character.isFound
                    ? "bg-green-300 text-sm "
                    : "bg-neutral-100 cursor-pointer hover:bg-blue-400 ") +
                  (index == 0 ? "rounded-t-md " : " ") +
                  (index == characters.length - 1 ? "rounded-b-md" : "")
                }
              >
                {character.name}
              </li>
            ))}
          </ul>
        </OutsideClickHandler>
      )}

      <div className="flex">
        <img
          draggable="false"
          className="rounded-xl mt-5"
          src={puzzleImage}
          onClick={handleClick}
        />

        <ul className="fixed left-6 bottom-12   px-4 rounded-xl text-xl shadow-md shadow-neutral-400">
          {characters.map((character, index) => (
            <li
              key={index}
              className={
                "px-2 text-center font-bold noselect text-gray-800 " +
                (character.isFound ? "bg-green-500 " : "bg-red-300 ") +
                (index == 0 ? "rounded-t-md " : " ") +
                (index == characters.length - 1 ? "rounded-b-md" : "")
              }
            >
              {character.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Game;
