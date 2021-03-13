import { useEffect, useRef } from "react";
import { Viewport } from "pixi-viewport";

import * as PIXI from "pixi.js";

import Community from "../objects/Community";
import { layout } from "../utils";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

interface SimulatorProps {
  communityCount: number;
}

export default function Simulator({ communityCount }: SimulatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  const appRef = useRef(
    new PIXI.Application({
      backgroundColor: 0x212529,
      width: gameWidth,
      height: gameHeight,
      antialias: true,
    })
  );
  const app = appRef.current;

  const viewportRef = useRef(
    new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      interaction: app.renderer.plugins.interaction,
    })
  );
  const viewport = viewportRef.current;

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.appendChild(app.view);
      app.start();
    }

    app.stage.addChild(viewport);
    viewport.drag().pinch().wheel().decelerate();

    /*
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
    */

    function onResize() {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      app.destroy(true, true);
    };
  }, [app, viewport]);

  useEffect(() => {
    viewport.removeChildren();

    const comms = layout(window.innerWidth, 350, 350, communityCount).map(
      (r) => new Community(app, r)
    );
    viewport.addChild(...comms);
  }, [communityCount, app, viewport]);

  return <div ref={ref} />;
}
