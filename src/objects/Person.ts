import * as PIXI from "pixi.js";
import gsap from "gsap";

import InfectCircle from "./InfectCircle";
import params from "../parameters";

export type PersonStatus = "alive" | "removing" | "removed";

export default class Person extends PIXI.Container {
    private _angle: number;
    private _speed: number;

    private _person: PIXI.Graphics;
    private _infectCircle: InfectCircle;

    private _infected: boolean;
    private _infectTimer: number;

    private _status: PersonStatus;

    private _circleAnimation: gsap.core.Tween;

    readonly normalColor = 0xced4da;
    readonly infectedColor = 0xff6b6b;
    readonly removedColor = 0x495057;

    constructor(app: PIXI.Application, position: PIXI.Point, angle: number, speed: number) {
        super();

        this.sortableChildren = true;
        this.x = position.x;
        this.y = position.y;

        this._angle = angle;
        this._speed = speed;

        this._infected = false;
        this._infectTimer = 0;

        this._status = "alive";

        this._person = new PIXI.Graphics();
        this._infectCircle = new InfectCircle(1, 0.25);

        this.addChild(this._person);
        this.addChild(this._infectCircle);

        this.draw();

        this._circleAnimation = gsap.fromTo(
            this._infectCircle,
            { pixi: { scale: 1 }, alpha: 1 },
            {
                pixi: {
                    scale: params.infectCircleRadius,
                },
                alpha: 0,
                duration: 1,
                repeat: -1,
                paused: true,
                onRepeat: () => {
                    if (!this._infected) this._circleAnimation.pause(0);
                },
            }
        );

        app.ticker.add((delta) => {
            if (this._infected) {
                this._infectTimer += (1 / 60) * delta;

                if (this._infectTimer >= params.killTimer) {
                    this.remove();
                }
            }

            this.x += Math.cos(this._angle) * this._speed * delta;
            this.y += Math.sin(this._angle) * this._speed * delta;
        });
    }

    draw(): void {
        this._person.clear();
        this._person.beginFill(this.normalColor);
        this._person.drawCircle(0, 0, params.personRadius);
        this._person.endFill();
    }

    get angle(): number {
        return this._angle;
    }

    set angle(v: number) {
        this._angle = v;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(v: number) {
        this._speed = v;
    }

    get infected(): boolean {
        return this._infected;
    }

    set infected(v: boolean) {
        const toColor = v ? this.infectedColor : this.normalColor;

        gsap.to(this._person, {
            pixi: { fillColor: toColor },
            onComplete: () => {
                if (v) this._circleAnimation.resume();
            },
        });

        if (!v) this._infectTimer = 0;
        this._infected = v;
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
        gsap.to(this, { speed: 0, duration: 1, onComplete: () => (this._status = "removed") });
    }
}
