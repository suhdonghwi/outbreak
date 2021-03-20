import * as PIXI from "pixi.js";

import Person from "./Person";
import gsap from "gsap";

import { borderWidth, personRadius } from "../parameter";
import { distance } from "../utils";
import SettingsOverlay from "./SettingsOverlay";
import app from "../App";
import { getSimulatorState } from "../stores/SimulatorStore";
import { getParameterState } from "../stores/ParameterStore";
import { HighlightSpanKind } from "typescript";

export default class Community extends PIXI.Container {
  private _border: PIXI.Graphics;
  private _selected: boolean;
  private _id: number;

  private _population: Person[];

  private _drawWidth: number;
  private _drawHeight: number;
  private _overlay: SettingsOverlay;

  readonly offset = borderWidth + personRadius;

  private infectOther(person: Person) {
    for (let i = 0; i < this.population.length; i++) {
      const other = this.population[i];
      if (other.infected || other.status !== "alive" || person === other)
        continue;

      const { infectCircleRadius, infectProbability } = getParameterState();

      if (
        distance(person.position, other.position) <=
          infectCircleRadius + personRadius &&
        Math.random() < infectProbability
      ) {
        other.infected = true;
      }
    }
  }

  constructor(rect: PIXI.Rectangle, id: number) {
    super();

    this._selected = false;
    this._population = [];
    this._id = id;

    this.sortableChildren = true;

    this._drawWidth = rect.width;
    this._drawHeight = rect.height;

    this.x = rect.x;
    this.y = rect.y;

    this._border = new PIXI.Graphics();
    this.draw();
    this.addChild(this._border);

    this._overlay = new SettingsOverlay(
      app,
      new PIXI.Rectangle(
        borderWidth,
        borderWidth,
        rect.width - borderWidth * 2,
        rect.height - borderWidth * 2
      )
    );
    this._overlay.alpha = 0;
    this._overlay.zIndex = 1;
    this.addChild(this._overlay);

    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(0, 0, rect.width, rect.height);

    const duration = 0.1;
    this.on("mouseover", () => {
      if (getSimulatorState().status === "configure" && !this._selected)
        gsap.to(this._overlay, { alpha: 0.5, duration });
    });

    this.on("mouseout", () => {
      if (getSimulatorState().status === "configure" && !this._selected)
        gsap.to(this._overlay, { alpha: 0, duration });
    });

    app.ticker.add(() => {
      if (getSimulatorState().status !== "playing") return;

      for (let i = 0; i < this.population.length; i++) {
        const person = this.population[i];
        if (person.status === "removed" || person.status === "migrating")
          continue;

        if (person.x < this.offset) {
          person.x = this.offset;
          person.angle = Math.PI - person.angle;
        } else if (person.x > this._drawWidth - this.offset) {
          person.x = this._drawWidth - this.offset;
          person.angle = Math.PI - person.angle;
        }

        if (person.y < this.offset) {
          person.y = this.offset;
          person.angle = -person.angle;
        } else if (person.y > this._drawHeight - this.offset) {
          person.y = this._drawHeight - this.offset;
          person.angle = -person.angle;
        }

        if (person.infected) {
          this.infectOther(person);
        }
      }
    });
  }

  draw(): void {
    this._border.clear();
    this._border.lineStyle(borderWidth * 2, 0xffffff);
    this._border.drawRect(0, 0, this._drawWidth, this._drawHeight);
  }

  bindOnSelect(onSelect: (c: Community) => void) {
    this.on("click", () => {
      getSimulatorState().status === "configure" && onSelect(this);
    });
  }

  getRandomPoint(): PIXI.Point {
    return new PIXI.Point(
      this.offset + Math.random() * (this._drawWidth - this.offset * 2),
      this.offset + Math.random() * (this._drawHeight - this.offset * 2)
    );
  }

  get id(): number {
    return this._id;
  }

  get population(): Person[] {
    return this._population;
  }

  addRandomPopulation(count: number, point?: PIXI.Point) {
    for (let i = 0; i < count; i++)
      this.addPopulation(
        new Person(point || this.getRandomPoint(), Math.random() * 2 * Math.PI)
      );
  }

  addPopulation(...population: Person[]): void {
    this.population.push(...population);
    this.addChild(...population);
  }

  removePopulation(count: number = 1): void {
    for (let i = 0; i < count && this.population.length > 0; i++) {
      const toRemove = this.population.pop() as Person;
      this.removeChild(toRemove);
    }
  }

  removeAllPopulation(): void {
    this.removePopulation(this.population.length);
  }

  countAlive(): number {
    return this.population.filter((p) => p.status === "alive").length;
  }

  migrate(index: number, to: Community): void {
    if (
      index > this.population.length - 1 ||
      this.population[index].status !== "alive"
    )
      return;

    const person = this.population[index],
      targetLocalPos = to.getRandomPoint(),
      targetPos = this.toLocal(to.toGlobal(new PIXI.Point(0, 0)));

    person.status = "migrating";
    gsap.to(person.position, {
      x: targetPos.x + targetLocalPos.x,
      y: targetPos.y + targetLocalPos.y,
      ease: "power3.inOut",
      onComplete: () => {
        const index = this.population.indexOf(person);
        if (index !== -1) {
          this.population.splice(index, 1);

          person.position.set(targetLocalPos.x, targetLocalPos.y);
          person.status = "alive";
          to.addPopulation(person);
        }
      },
      duration: 1,
    });
  }

  set selected(v: boolean) {
    if (v) {
      this._overlay.alpha = 0.9;
    } else {
      this._overlay.alpha = 0;
    }

    this._selected = v;
  }
}
