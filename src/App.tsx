import React, { useState } from "react";
import * as PIXI from "pixi.js";

import ConfigModal from "./components/ConfigModal";
import Simulator from "./components/Simulator";
import Community from "./objects/Community";
import { layout } from "./utils";
import Person from "./objects/Person";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

function App() {
  const [app] = useState(
    () =>
      new PIXI.Application({
        backgroundColor: 0x212529,
        width: gameWidth,
        height: gameHeight,
        antialias: true,
      })
  );

  const [comms] = useState(() =>
    layout(window.innerWidth, 350, 350, 9).map(
      (r, i) => new Community(app, r, i + 1, onSelectCommunity)
    )
  );

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );

  function onAddPopulationToAll(n: number) {
    for (const comm of comms) {
      for (let i = 0; i < n; i++) {
        comm.addPopulation(
          new Person(app, comm.getRandomPoint(), Math.random() * 2 * Math.PI, 0)
        );
      }
    }
  }

  function onAddPopulation(n: number, c: Community) {
    for (let i = 0; i < n; i++) {
      c.addPopulation(
        new Person(app, c.getRandomPoint(), Math.random() * 2 * Math.PI, 0)
      );
    }
  }

  function onSelectCommunity(c: Community) {
    setSelectedCommunity(c);
  }

  return (
    <div className="App">
      <Simulator app={app} communities={comms} />
      <ConfigModal
        onAddPopulationToAll={onAddPopulationToAll}
        onAddPopulation={onAddPopulation}
        selectedCommunity={selectedCommunity}
      />
    </div>
  );
}

export default App;
