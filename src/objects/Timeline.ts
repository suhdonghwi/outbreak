import gsap from "gsap/all";
import * as PIXI from "pixi.js";

export default class Timeline extends PIXI.Graphics {
  private _drawWidth: number;
  private _divider: number;
  private _smallDivider: number;

  constructor(drawWidth: number, divider: number, smallDivider: number) {
    super();

    this.y = window.innerHeight + 100;
    this.x = (window.innerWidth - drawWidth) / 2;

    this._drawWidth = drawWidth;
    this._divider = divider;
    this._smallDivider = smallDivider;

    this.draw();
  }

  draw() {
    const bigTickWidth = 3,
      bigTickHeight = 20;

    const smallTickWidth = 2,
      smallTickHeight = 10;

    const drawBigTick = (x: number) => {
      this.drawRect(x, -bigTickHeight, bigTickWidth, bigTickHeight);
    };

    const drawSmallTick = (x: number) => {
      this.drawRect(x, -smallTickHeight, smallTickWidth, smallTickHeight);
    };

    this.beginFill(0xe9ecef);
    this.drawRect(0, 0, this._drawWidth, 3);

    let x = 0;
    const delta = this._drawWidth / this._divider,
      smallDelta = delta / this._smallDivider;
    for (let i = 0; i < this._divider - 1; i++) {
      x += delta;

      drawBigTick(x);
    }

    let x2 = 0;
    for (let i = 0; i < this._smallDivider * this._divider; i++) {
      drawSmallTick(x2);
      x2 += smallDelta;
    }

    drawBigTick(0);
    drawBigTick(this._drawWidth - bigTickWidth);
  }

  show() {
    gsap.to(this, { y: window.innerHeight - 30 });
  }
}
