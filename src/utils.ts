import * as PIXI from "pixi.js";

export function distance(p1: PIXI.Point, p2: PIXI.Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function layout(
  containerWidth: number,
  communityWidth: number,
  communityHeight: number,
  count: number
): PIXI.Rectangle[] {
  const topDownMargin = 100,
    gap = 60;

  const cols = Math.ceil(Math.sqrt(count));

  const delta = (containerWidth - ((communityWidth + gap) * cols - gap)) / 2,
    result = [];
  for (let i = 0; i < count; i++) {
    const currentRow = Math.floor(i / cols),
      currentCol = i % cols;

    result.push(
      new PIXI.Rectangle(
        (communityWidth + gap) * currentCol + delta,
        topDownMargin + (communityHeight + gap) * currentRow,
        communityWidth,
        communityHeight
      )
    );
  }

  return result;
}
