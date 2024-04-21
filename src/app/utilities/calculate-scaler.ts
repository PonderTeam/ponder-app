import { flashcardBaseHeight, flashcardBaseWidth } from "./constants";

export function calculateScaleFactor(widthSF: number=1, heightSF: number=1, shift: number=0) {
  return Math.min(
    (window.innerWidth * widthSF + shift) / flashcardBaseWidth,
    (window.innerHeight * heightSF + shift) / flashcardBaseHeight
  );
}
