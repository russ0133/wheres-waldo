import React, { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { characters } from "../utils/characters";

import img from "../img/image1.jpg";

function Game({ currentCharacter }) {
  const [clicked, setClicked] = useState(false);
  const [coords, setCoords] = useState(null);

  const clickRef = useRef(null); // ? The DOM element that shows the target box.
  const characterRef = useRef(null); // ? The DOM element that shows the character selection box.

  function verifyCorrectClick(x, y, characterName) {
    const found = characters.find(
      (character) => character.name == characterName
    );
  }

  function getClickCoordinates(e) {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );
    const coords = { xCoord, yCoord };
    setCoords(coords);
    return console.log(coords);
  }

  const displayTargetBox = (event) => {
    clickRef.current.classList.add(
      "border-8",
      "border-blue-900",
      "shadow-lg",
      "border-double",
      "absolute",
      "rounded-lg",
      "w-12",
      "h-12"
    );
    clickRef.current.style.left = event.pageX - 24 + "px";
    clickRef.current.style.top = event.pageY - 24 + "px";
  };
  const displayCharacterList = (event) => {
    characterRef.current.classList.add(
      "shadow-lg",
      "border-double",
      "absolute",
      "rounded-md",
      "w-max",
      "h-max"
    );
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
          <ul className="bg-neutral-200" ref={characterRef}>
            {characters.map((character) => (
              <li
                onClick={() => {
                  verifyCorrectClick(
                    coords["xCoord"],
                    coords["yCoord"],
                    character.name
                  );
                }}
                className="px-2 text-center font-bold hover:bg-blue-400 rounded-md noselect"
              >
                {character.name}
              </li>
            ))}
          </ul>
        </OutsideClickHandler>
      )}
      {!clicked && <div>Debug: Not clicked</div>}
      <img draggable="false" src={img} onClick={handleClick} />
    </div>
  );
}

export default Game;
