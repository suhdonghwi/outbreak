import gsap from "gsap/all";
import * as PIXI from "pixi.js";

export default class Timeline extends PIXI.Graphics {
  private _drawWidth: number;
  private _divider: number;

  constructor(drawWidth: number, divider: number) {
    super();

    this.y = window.innerHeight + 100;
    this.x = (window.innerWidth - drawWidth) / 2;

    this._drawWidth = drawWidth;
    this._divider = divider;

    this.draw();
  }

  draw() {
    const tickRadius = 10;

    const drawBigTick = (x: number) => {
      this.drawCircle(x, 2.5, tickRadius);
    };

    this.beginFill(0xdee2e6);
    this.drawRect(0, 0, this._drawWidth, 5);

    let x = 0;
    const delta = this._drawWidth / this._divider;
    for (let i = 0; i < this._divider - 1; i++) {
      x += delta;

      drawBigTick(x);
    }

    drawBigTick(0);
    drawBigTick(this._drawWidth - tickRadius);
  }

  show() {
    gsap.to(this, { y: window.innerHeight - 50 });
  }
}
