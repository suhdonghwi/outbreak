import gsap from "gsap/all";
import * as PIXI from "pixi.js";
import { TextStyle } from "pixi.js";

export default class Timeline extends PIXI.Container {
  private _timeline: PIXI.Graphics;

  private _drawWidth: number;
  private _divider: number;

  constructor(drawWidth: number, divider: number) {
    super();

    this.y = window.innerHeight + 100;
    this.x = (window.innerWidth - drawWidth) / 2;

    this._drawWidth = drawWidth;
    this._divider = divider;

    this._timeline = new PIXI.Graphics();
    this.drawTimeline(1);
    this.addChild(this._timeline);
  }

  drawTimeline(from: number) {
    const tickRadius = 14;

    const drawBigTick = (x: number) => {
      this._timeline.drawCircle(x, 3.5, tickRadius);
    };

    this._timeline.clear();
    this._timeline.removeChildren();

    this._timeline.beginFill(0x868e96, 0.5);
    this._timeline.drawRect(0, 0, this._drawWidth, 7);
    this._timeline.endFill();

    this._timeline.beginFill(0x495057);

    const textStyle = new PIXI.TextStyle({
      fill: "white",
      fontSize: 14,
    });

    let x = 0;
    const delta = this._drawWidth / this._divider;

    for (let i = 0; i < this._divider + 1; i++) {
      const number = new PIXI.Text((from + i).toString(), textStyle);
      number.resolution = 2;
      number.x = x - number.width / 2;
      number.y -= 5;
      this._timeline.addChild(number);

      drawBigTick(x);
      x += delta;
    }
    this._timeline.endFill();
  }

  show() {
    gsap.to(this, { y: window.innerHeight - 50 });
  }
}
