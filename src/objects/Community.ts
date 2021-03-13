import * as PIXI from "pixi.js";

import Person from "./Person";
import gsap from "gsap";

import params from "../parameters";
import { distance } from "../utils";

export default class Community extends PIXI.Graphics {
  private _people: Person[];
  private _drawWidth: number;
  private _drawHeight: number;

  readonly offset = params.borderWidth + params.personRadius;

  private infectOther(person: Person) {
    for (let i = 0; i < this.people.length; i++) {
      const other = this.people[i];
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

    this._people = [];

    app.ticker.add(() => {
      for (let i = 0; i < this.people.length; i++) {
        const person = this.people[i];
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

  get people(): Person[] {
    return this._people;
  }

  addPeople(people: Person[]): void {
    this.people.push(...people);
    this.addChild(...people);
  }

  countAlive(): number {
    return this.people.filter((p) => p.status === "alive").length;
  }

  migrate(index: number, to: Community): void {
    if (index > this.people.length - 1 || this.people[index].status !== "alive")
      return;

    const person = this.people.splice(index, 1)[0],
      targetLocalPos = to.getRandomPoint(),
      targetPos = this.toLocal(to.toGlobal(new PIXI.Point(0, 0)));

    gsap.to(person.position, {
      x: targetPos.x + targetLocalPos.x,
      y: targetPos.y + targetLocalPos.y,
      ease: "power3.inOut",
      onComplete: () => {
        person.position.set(targetLocalPos.x, targetLocalPos.y);
        to.addPeople([person]);
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
