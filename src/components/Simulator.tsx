import { useEffect, useRef, useState } from "react";
import { Viewport } from "pixi-viewport";

import * as PIXI from "pixi.js";

import Community from "../objects/Community";

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

interface SimulatorProps {
  communities: Community[];
  app: PIXI.Application;
}

export default function Simulator({ app, communities }: SimulatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [viewport] = useState(
    () =>
      new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction,
      })
  );

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.appendChild(app.view);
      app.start();
    }

    app.stage.addChild(viewport);
    viewport.drag().pinch().wheel().decelerate();

    function onResize() {
      app.renderer.resize(window.innerWidth, window.innerHeight);
      viewport.resize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      app.destroy(true, true);
    };
  }, [app, viewport]);

  useEffect(() => {
    viewport.removeChildren();
    if (communities.length > 0) viewport.addChild(...communities);
  }, [communities, app, viewport]);

  return <div ref={ref} />;
}
