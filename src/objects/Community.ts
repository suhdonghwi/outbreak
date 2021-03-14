import * as PIXI from "pixi.js";

import Person from "./Person";
import gsap from "gsap";

import params from "../parameters";
import { distance } from "../utils";

export default class Community extends PIXI.Graphics {
  private _population: Person[];
  private _drawWidth: number;
  private _drawHeight: number;

  readonly offset = params.borderWidth + params.personRadius;

  private infectOther(person: Person) {
    for (let i = 0; i < this.population.length; i++) {
      const other = this.population[i];
      if (other.infected || other.status !== "alive" || person === other)
        continue;

      if (
        distance(person.position, other.position) <=
          params.infectCircleRadius + params.personRadius &&
        Math.random() < params.infectProbability
      ) {
        other.infected = true;
      }
    }
  }

  constructor(app: PIXI.Application, rect: PIXI.Rectangle) {
    super();

    this._drawWidth = rect.width;
    this._drawHeight = rect.height;
    this.x = rect.x;
    this.y = rect.y;
    this.draw();

    this._population = [];

    app.ticker.add(() => {
      for (let i = 0; i < this.population.length; i++) {
        const person = this.population[i];
        if (person.status === "removed") continue;
        //if (person.migrating) continue;
        //console.log(i);

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
    this.clear();
    this.lineStyle(params.borderWidth * 2, 0xffffff);
    this.drawRect(0, 0, this._drawWidth, this._drawHeight);
  }

  getRandomPoint(): PIXI.Point {
    return new PIXI.Point(
      this.offset + Math.random() * (this._drawWidth - this.offset * 2),
      this.offset + Math.random() * (this._drawHeight - this.offset * 2)
    );
  }

  get population(): Person[] {
    return this._population;
  }

  addPopulation(...population: Person[]): void {
    this.population.push(...population);
    this.addChild(...population);
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

    const person = this.population.splice(index, 1)[0],
      targetLocalPos = to.getRandomPoint(),
      targetPos = this.toLocal(to.toGlobal(new PIXI.Point(0, 0)));

    gsap.to(person.position, {
      x: targetPos.x + targetLocalPos.x,
      y: targetPos.y + targetLocalPos.y,
      ease: "power3.inOut",
      onComplete: () => {
        person.position.set(targetLocalPos.x, targetLocalPos.y);
        to.addPopulation(person);
      },
      duration: 1,
    });
  }

  reposition(rect: PIXI.Rectangle): void {
    gsap.to(this, {
      _drawWidth: rect.width,
      _drawHeight: rect.height,
      x: rect.x,
      y: rect.y,
      onUpdate: () => this.draw(),
    });
  }
}
