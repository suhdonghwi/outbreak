import * as PIXI from "pixi.js";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

const app = new PIXI.Application({
  backgroundColor: 0x212529,
  width: gameWidth,
  height: gameHeight,
  antialias: true,
  resizeTo: window,
});

app.ticker.speed = 1;

export default app;
