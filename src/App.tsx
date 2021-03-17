import React, { useEffect, useState } from "react";
import * as PIXI from "pixi.js";

import ConfigModal from "./components/ConfigModal";
import Simulator from "./components/Simulator";
import Community from "./objects/Community";
import { layout } from "./utils";
import Person from "./objects/Person";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

const app = new PIXI.Application({
  backgroundColor: 0x212529,
  width: gameWidth,
  height: gameHeight,
  antialias: true,
});

function App() {
  const [comms, setComms] = useState<Community[]>([]);
  const [communityCount, setCommunityCount] = useState(4);

  useEffect(() => {
    const newComms = layout(window.innerWidth, 350, 350, communityCount).map(
      (r, i) => new Community(app, r, i + 1)
    );

    function onSelectCommunity(c: Community) {
      for (const comm of newComms) {
        comm.status = "configure";
      }
      c.status = "selected";

      setSelectedCommunity(c);
    }

    newComms.map((c) => c.bindOnSelect(onSelectCommunity));
    setComms(newComms);
  }, [communityCount]);

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

  return (
    <div className="App">
      <Simulator app={app} communities={comms} />
      <ConfigModal
        onAddPopulationToAll={onAddPopulationToAll}
        onAddPopulation={onAddPopulation}
        selectedCommunity={selectedCommunity}
        communityCount={communityCount}
        onChangeCommunityCount={(v) => setCommunityCount(v)}
      />
    </div>
  );
}

export default App;
