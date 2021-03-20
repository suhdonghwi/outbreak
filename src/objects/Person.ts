import * as PIXI from "pixi.js";
import gsap from "gsap";

import InfectCircle from "./InfectCircle";
import { personRadius } from "../parameter";
import app from "../App";
import { getSimulatorState } from "../stores/SimulatorStore";
import { getParameterState } from "../stores/ParameterStore";

type PersonStatus = "alive" | "migrating" | "removing" | "removed";

export default class Person extends PIXI.Container {
  private _angle: number;
  private _speedFactor: number;

  private _person: PIXI.Graphics;
  private _infectCircle: InfectCircle;

  private _infected: boolean;
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
    this._speedFactor = 1;

    this._infected = false;
    this._infectTimer = 0;

    this._status = "alive";

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
      if (this._infected) {
        this._infectTimer += (1 / 60) * delta;

        if (this._infectTimer >= killTimer) {
          this.remove();
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

      this.x += Math.cos(this._angle) * personSpeed * this._speedFactor * delta;
      this.y += Math.sin(this._angle) * personSpeed * this._speedFactor * delta;
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

  get infected(): boolean {
    return this._infected;
  }

  set infected(v: boolean) {
    const toColor = v ? this.infectedColor : this.normalColor;

    gsap.to(this._person, {
      pixi: { fillColor: toColor },
    });

    if (!v) this._infectTimer = 0;
    this._infected = v;
  }

  get speedFactor(): number {
    return this._speedFactor;
  }

  set speedFactor(v: number) {
    this._speedFactor = v;
  }

  set status(v: PersonStatus) {
    this._status = v;
  }

  get status(): PersonStatus {
    return this._status;
  }

  remove(): void {
    this._infected = false;
    this._status = "removing";

    gsap.to(this._person, {
      pixi: { fillColor: this.removedColor },
      duration: 1,
    });
    gsap.to(this, {
      speedFactor: 0,
      duration: 1,
      onComplete: () => (this._status = "removed"),
    });
  }
}
