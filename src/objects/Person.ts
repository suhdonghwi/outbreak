import * as PIXI from "pixi.js";
import gsap from "gsap";

import InfectCircle from "./InfectCircle";
import { personRadius } from "../parameter";
import app from "../App";
import { getSimulatorState } from "../stores/SimulatorStore";
import { getParameterState } from "../stores/ParameterStore";

type PersonStatus = "normal" | "infected" | "removed";

export default class Person extends PIXI.Container {
  private _angle: number;

  private _person: PIXI.Graphics;
  private _infectCircle: InfectCircle;

  private _infectTimer: number;

  private _status: PersonStatus;

  readonly normalColor = 0xced4da;
  readonly infectedColor = 0xff6b6b;
  readonly removedColor = 0x495057;

  constructor(position: PIXI.Point, angle: number) {
    super();

    this.sortableChildren = true;
    this.x = position.x;
    this.y = position.y;

    this._angle = angle;

    this._infectTimer = 0;
    this._status = "normal";

    this._person = new PIXI.Graphics();
    this._infectCircle = new InfectCircle(1, 0.25);

    this.addChild(this._person);
    this.addChild(this._infectCircle);

    this.draw();

    let circleTimer = 0;
    app.ticker.add((delta) => {
      if (getSimulatorState().status !== "playing") return;

      const {
        killTimer,
        infectCircleRadius,
        personSpeed,
      } = getParameterState();
      if (this.status === "infected") {
        this._infectTimer += (1 / 60) * delta;

        if (this._infectTimer >= killTimer) {
          this.status = "removed";
        }

        circleTimer += delta / 60;
        if (circleTimer >= 1) {
          gsap.fromTo(
            this._infectCircle,
            { pixi: { scale: 1 }, alpha: 1 },
            {
              pixi: {
                scale: infectCircleRadius,
              },
              alpha: 0,
              duration: 1,
            }
          );
          circleTimer = 0;
        }
      }

      this.x += Math.cos(this._angle) * personSpeed * delta;
      this.y += Math.sin(this._angle) * personSpeed * delta;
    });
  }

  draw(): void {
    this._person.clear();
    this._person.beginFill(this.normalColor);
    this._person.drawCircle(0, 0, personRadius);
    this._person.endFill();
  }

  get angle(): number {
    return this._angle;
  }

  set angle(v: number) {
    this._angle = v;
  }

  set status(v: PersonStatus) {
    let toColor;

    switch (v) {
      case "normal":
        toColor = this.normalColor;
        break;
      case "infected":
        toColor = this.infectedColor;
        break;
      case "removed":
        toColor = this.removedColor;
        break;
    }

    gsap.to(this._person, {
      pixi: { fillColor: toColor },
    });

    if (this.status !== "infected") this._infectTimer = 0;
    this._status = v;
  }

  get status(): PersonStatus {
    return this._status;
  }
}
