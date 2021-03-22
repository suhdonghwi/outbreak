import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

import ConfigModal from "./components/ConfigModal";
import Simulator from "./components/Simulator";
import Community from "./objects/Community";
import { layout, randomInteger } from "./utils";
import app from "./App";
import Timeline from "./components/Timeline";
import { getSimulatorState, setSimulatorState } from "./stores/SimulatorStore";
import { getParameterState } from "./stores/ParameterStore";
import { Parameter } from "./parameter";

function Main() {
  const [comms, setComms] = useState<Community[]>([]);

  const [initialState, setInitialState] = useState<PIXI.Point[][]>([]);
  const [communityCount, setCommunityCount] = useState(4);
  const [communitySize, setCommunitySize] = useState(350);

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [configHidden, setConfigHidden] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [day, setDay] = useState(0);
  const dayPerSecond = 0.25;

  const commsRef = useRef<Community[]>();
  commsRef.current = comms;

  useEffect(() => {
    let migrateCounter = 0;
    app.ticker.add((delta) => {
      const comms = commsRef.current;

      if (getSimulatorState().status !== "playing" || comms === undefined)
        return;

      setDay((d) => d + (delta / 60) * dayPerSecond);

      if (comms.length > 1) {
        const { migrateInterval } = getParameterState();
        if (migrateCounter > migrateInterval) {
          const sum = comms
            .map((c) => c.countNonMigrating())
            .reduce((a, b) => a + b);
          if (sum === 0) return;

          let comm1;
          do {
            comm1 = randomInteger(0, comms.length - 1);
          } while (comms[comm1].countNonMigrating() === 0);

          let index;
          do {
            index = randomInteger(0, comms[comm1].population.length - 1);
          } while (comms[comm1].population[index].migrating);

          let comm2;
          do {
            comm2 = randomInteger(0, comms.length - 1);
          } while (comm1 === comm2);

          comms[comm1].migrate(index, comms[comm2]);
          migrateCounter = 0;
        } else migrateCounter += delta / 60;
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCommunity !== null && selectedCommunity.id > communityCount) {
      setSelectedCommunity(null);
    }
  }, [communityCount, selectedCommunity]);

  useEffect(() => {
    const newLayout = layout(
      window.innerWidth,
      communitySize,
      communitySize,
      communityCount
    );
    const newComms = newLayout.map((l, i) => new Community(l, i + 1));

    let i = 0;
    for (; i < Math.min(communityCount, comms.length); i++) {
      comms[i].x = newLayout[i].x;
      comms[i].y = newLayout[i].y;
      comms[i].rect = newLayout[i];

      newComms[i] = comms[i];
    }

    function onSelectCommunity(c: Community) {
      for (const comm of newComms) {
        comm.selected = false;
      }
      c.selected = true;

      setSelectedCommunity(c);
    }

    newComms.map((c) => c.bindOnSelect(onSelectCommunity));
    setComms(newComms);
    // eslint-disable-next-line
  }, [communityCount, communitySize]);

  function onAddPopulation(n: number, c?: Community) {
    if (c === undefined) {
      for (const comm of comms) {
        comm.addRandomPopulation(n);
      }
    } else {
      c.addRandomPopulation(n);
    }
  }

  function onRemovePopulation(n: number, c?: Community) {
    if (c === undefined) {
      for (const comm of comms) {
        comm.removePopulation(n);
      }
    } else {
      c.removePopulation(n);
    }
  }

  function onFinishEnvSetting() {
    const state = comms.map((comm) =>
      comm.population.map((p) => p.position.clone())
    );
    setInitialState(state);

    setSimulatorState({ status: "paused" });
    for (const comm of comms) {
      comm.selected = false;
    }

    setConfigHidden(true);
  }

  function onToggle() {
    setSimulatorState({ status: playing ? "paused" : "playing" });
    setPlaying((v) => !v);
  }

  function onReset() {
    for (const comm of comms) {
      comm.clearPopulation();
    }

    let i = 0;
    for (const points of initialState) {
      for (const point of points) {
        comms[i].addRandomPopulation(1, point);
      }
      i++;
    }

    setDay(0);
    setSimulatorState({ status: "configure" });
    setConfigHidden(false);
    setPlaying(false);
  }

  function onEvent({ randomlyInfect }: Parameter) {
    console.log(comms);

    const wholePopulation = [];
    for (const comm of comms) {
      wholePopulation.push(...comm.population);
    }

    for (let i = 0; i < randomlyInfect; i++) {
      const person =
        wholePopulation[randomInteger(0, wholePopulation.length - 1)];
      if (person) person.status = "infected";
    }
  }

  return (
    <div className="App">
      <Simulator app={app} communities={comms} />
      <ConfigModal
        selectedCommunity={selectedCommunity}
        communityCount={communityCount}
        onChangeCommunityCount={(v) => setCommunityCount(v)}
        communitySize={communitySize}
        onChangeCommunitySize={(v) => setCommunitySize(v)}
        onAddPopulation={onAddPopulation}
        onRemovePopulation={onRemovePopulation}
        hidden={configHidden}
        onFinish={onFinishEnvSetting}
      />
      <Timeline
        hidden={!configHidden}
        day={day}
        playing={playing}
        onToggle={onToggle}
        onReset={onReset}
        onEvent={onEvent}
      />
    </div>
  );
}

export default Main;
