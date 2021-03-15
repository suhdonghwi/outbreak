import React, { useRef } from "react";
import * as PIXI from "pixi.js";

import ConfigModal from "./components/ConfigModal";
import Simulator from "./components/Simulator";
import Community from "./objects/Community";
import { layout } from "./utils";
import Person from "./objects/Person";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

function App() {
  const appRef = useRef(
    new PIXI.Application({
      backgroundColor: 0x212529,
      width: gameWidth,
      height: gameHeight,
      antialias: true,
    })
  );
  const app = appRef.current;
  const comms = layout(window.innerWidth, 350, 350, 9).map(
    (r) => new Community(app, r)
  );

  function onAddPopulation(n: number) {
    for (const comm of comms) {
      for (let i = 0; i < n; i++) {
        comm.addPopulation(
          new Person(app, comm.getRandomPoint(), Math.random() * 2 * Math.PI, 0)
        );
      }
    }
  }

  return (
    <div className="App">
      <Simulator app={app} communities={comms} />
      <ConfigModal onAddPopulation={onAddPopulation} />
    </div>
  );
}

export default App;
