import * as PIXI from "pixi.js";

export default class InfectCircle extends PIXI.Graphics {
    private _radius: number;
    private _thickness: number;

    readonly circleColor = 0xff6b6b;

    constructor(radius: number, thickness: number) {
        super();

        this._radius = radius;
        this._thickness = thickness;
        this.draw();
        this.zIndex = -1;
    }

    draw(): void {
        this.clear();
        this.lineStyle(this._thickness, this.circleColor);
        this.drawCircle(0, 0, this._radius);
    }
}
