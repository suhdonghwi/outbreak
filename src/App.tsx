import React, { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import gsap from "gsap";

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
    if (selectedCommunity !== null && selectedCommunity.id > communityCount) {
      setSelectedCommunity(null);
    }

    const newLayout = layout(window.innerWidth, 350, 350, communityCount);
    const newComms = newLayout.map((l, i) => new Community(app, l, i + 1));

    for (let i = 0; i < Math.min(communityCount, comms.length); i++) {
      gsap.to(comms[i], {
        x: newLayout[i].x,
        y: newLayout[i].y,
        duration: 0.2,
      });
      newComms[i] = comms[i];
    }

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
