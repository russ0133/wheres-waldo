import { toBeInTheDOM } from "@testing-library/jest-dom/dist/matchers";
import { characters } from "./characters";
export default function isBetweenXDegrees(characterName, x, y, degrees) {
  const found = characters.filter(
    (character) => character.name == characterName
  );

  console.log(found);
  const rangeXMinus = found[0].x - degrees;
  const rangeXPlus = found[0].x + degrees;
  const rangeYMinus = found[0].y - degrees;
  const rangeYPlus = found[0].y + degrees;
  if (
    x >= rangeXMinus &&
    x <= rangeXPlus &&
    y >= rangeYMinus &&
    y <= rangeYPlus
  ) {
    return true;
  } else return false;
}
