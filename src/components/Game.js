import React, { useRef, useState } from "react";
import img from "../img/image1.jpg";
const characters = [
  { name: "Yoda", x: 53, y: 25 },
  { name: "Test", x: 15, y: 22 },
];

// ? For handling clicks, check:
// ? https://github.com/airbnb/react-outside-click-handler
// ? https://github.com/KFig21/photo_tagging_app/blob/main/src/pages/Game.js

function Game({ currentCharacter }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [clicked, setClicked] = useState(false);
  const clickRef = useRef(null);
  function verifyCorrectClick(x, y, character) {
    // Receives X and Y, checks with character X and Y
  }
  function getClickCoordinates(e) {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );
    const coords = { xCoord, yCoord };
    return console.log(coords);
  }

  const handleClick = async (event) => {
    const click = await setClicked(true);
    clickRef.current.classList.add(
      "border-8",
      "border-teal-800",
      "shadow-lg",
      "border-double",
      "absolute",
      "rounded-lg"
    );
    clickRef.current.style.left = event.pageX - 24 + "px";
    clickRef.current.style.top = event.pageY - 24 + "px";
    clickRef.current.style.width = "48px";
    clickRef.current.style.height = "48px";
  };
  return (
    <div className="cursor-crosshair">
      {clicked && <div ref={clickRef}></div>}
      <img src={img} onClick={handleClick} />
    </div>
  );
}

export default Game;

{
  /* <Menu
id="simple-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={closeMenu}
anchorOrigin={{
  vertical: "center",
  horizontal: "right",
}}
transformOrigin={{
  vertical: "center",
  horizontal: "left",
}}
getContentAnchorEl={null}
>
{charsLeft.map((char) => (
  <MenuItem data-id={char.id} key={char.id} onClick={closeMenu}>
    {char.name}
  </MenuItem>
))}
</Menu> */
}
