import * as PIXI from "pixi.js";

export default class SettingsOverlay extends PIXI.Graphics {
  private _rect: PIXI.Rectangle;
  private _text: PIXI.Text;

  constructor(rect: PIXI.Rectangle) {
    super();

    this.x = rect.x;
    this.y = rect.y;
    this._rect = rect;

    const textStyle = new PIXI.TextStyle({
      fill: "white",
      fontSize: 70,
    });
    const text = new PIXI.Text("🛠️", textStyle);
    text.anchor.set(0.5);
    text.resolution = 1.5;

    this._text = text;
    this.addChild(this._text);

    this.draw();
  }

  draw() {
    this.clear();
    this.beginFill(0x343a40);
    this.drawRect(0, 0, this._rect.width, this._rect.height);
    this.endFill();

    this._text.style.fontSize = this._rect.width / 5;

    this._text.x = this._rect.width / 2;
    this._text.y = this._rect.height / 2;
  }
}
