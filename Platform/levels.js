import Brick from "../Common/Brick.js";

export function buildLevel(gameManager, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 100 * brickIndex,
          y: 144 * rowIndex // 6*24
        };
        bricks.push(new Brick(gameManager, position, 100, 24));
      }
    });
  });

  return bricks;
}

export const level2 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0]
];

export const level3 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0]
];

export const level1 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0]
];
