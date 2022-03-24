import { characters } from "./characters";
export default function isBetweenXDegrees(characterName, x, y) {
  const found = characters.filter(
    (character) => character.name == characterName
  );
  if (
    x >= found.x - 3 &&
    x <= found.x + 3 &&
    y >= found.y - 3 &&
    y <= found.y + 3
  )
    return true;
  else return false;
}
