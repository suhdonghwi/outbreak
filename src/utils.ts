import * as PIXI from "pixi.js";

export function distance(p1: PIXI.Point, p2: PIXI.Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function layout(
  containerWidth: number,
  communitySizes: number[],
  count: number
): PIXI.Rectangle[] {
  const topDownMargin = 100,
    gap = 60;

  const cols = Math.ceil(Math.sqrt(count));
  const maxSize = Math.max(...communitySizes);

  const delta = (containerWidth - ((maxSize + gap) * cols - gap)) / 2,
    result = [];
  for (let i = 0; i < count; i++) {
    const currentRow = Math.floor(i / cols),
      currentCol = i % cols;

    result.push(
      new PIXI.Rectangle(
        (maxSize + gap) * currentCol + delta - communitySizes[i] / 2,
        topDownMargin + (maxSize + gap) * currentRow - communitySizes[i] / 2,
        communitySizes[i],
        communitySizes[i]
      )
    );
  }

  return result;
}
