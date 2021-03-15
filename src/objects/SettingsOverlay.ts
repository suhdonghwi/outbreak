import * as PIXI from "pixi.js";

export default class SettingsOverlay extends PIXI.Graphics {
  constructor(app: PIXI.Application, rect: PIXI.Rectangle) {
    super();

    this.x = rect.x;
    this.y = rect.y;

    this.beginFill(0x343a40);
    this.drawRect(0, 0, rect.width, rect.height);
    this.endFill();

    const textStyle = new PIXI.TextStyle({
      fill: "white",
      fontSize: 70,
    });
    const text = new PIXI.Text("🛠️", textStyle);
    text.x = rect.width / 2 - text.width / 2;
    text.y = rect.height / 2 - text.height / 2;
    text.resolution = 1.5;

    this.addChild(text);
  }
}
