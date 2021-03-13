import { useEffect, useRef } from "react";
import { Viewport } from "pixi-viewport";

import * as PIXI from "pixi.js";

import Community from "../objects/Community";
import { layout, randomInteger } from "../utils";
import params from "../parameters";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

export default function Simulator() {
  const ref = useRef<HTMLDivElement>(null);
  const appRef = useRef(
    new PIXI.Application({
      backgroundColor: 0x212529,
      width: gameWidth,
      height: gameHeight,
      antialias: true,
    })
  );

  useEffect(() => {
    const app = appRef.current;

    if (ref.current !== null) {
      ref.current.appendChild(app.view);
      app.start();
    }

    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      interaction: app.renderer.plugins.interaction,
    });

    app.stage.addChild(viewport);
    viewport.drag().pinch().wheel().decelerate();

    const comms = layout(window.innerWidth, 350, 350, 4).map(
      (r) => new Community(app, r, 50)
    );
    comms[0].people[0].infected = true;
    viewport.addChild(...comms);

    setInterval(() => {
      const sum = comms.map((c) => c.countAlive()).reduce((a, b) => a + b);
      if (sum === 0) return;

      let comm1;
      do {
        comm1 = randomInteger(0, comms.length - 1);
      } while (comms[comm1].countAlive() === 0);

      let index;
      do {
        index = randomInteger(0, comms[comm1].people.length - 1);
      } while (comms[comm1].people[index].status !== "alive");

      let comm2;
      do {
        comm2 = randomInteger(0, comms.length - 1);
      } while (comm1 === comm2);

      comms[comm1].migrate(index, comms[comm2]);
    }, params.migrateInterval * 1000);

    function onResize() {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      app.destroy(true, true);
    };
  }, []);

  return <div ref={ref} />;
}
