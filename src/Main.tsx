import React, { useEffect, useState } from "react";
import gsap from "gsap";

import ConfigModal from "./components/ConfigModal";
import Simulator from "./components/Simulator";
import Community from "./objects/Community";
import { layout } from "./utils";
import app from "./App";
import Timeline from "./components/Timeline";
import { setSimulatorState } from "./stores/SimulatorStore";

function Main() {
  const [comms, setComms] = useState<Community[]>([]);
  const [communityCount, setCommunityCount] = useState(4);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [configHidden, setConfigHidden] = useState(false);

  useEffect(() => {
    if (selectedCommunity !== null && selectedCommunity.id > communityCount) {
      setSelectedCommunity(null);
    }
  }, [communityCount, selectedCommunity]);

  useEffect(() => {
    const newLayout = layout(window.innerWidth, 350, 350, communityCount);
    const newComms = newLayout.map((l, i) => new Community(l, i + 1));

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
        comm.selected = false;
      }
      c.selected = true;

      setSelectedCommunity(c);
    }

    newComms.map((c) => c.bindOnSelect(onSelectCommunity));
    setComms(newComms);
  }, [communityCount]);

  function onAddPopulation(n: number, c?: Community) {
    if (c === undefined) {
      for (const comm of comms) {
        comm.addRandomPopulation(n, 0);
      }
    } else {
      c.addRandomPopulation(n, 0);
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
    setSimulatorState({ status: "paused" });
    for (const comm of comms) {
      comm.selected = false;
    }

    setConfigHidden(true);
  }

  const [day, setDay] = useState(0);

  useEffect(() => {
    function updateDay() {
      setDay((d) => d + 0.0025);
    }

    //setInterval(updateDay, 1);
  }, []);

  return (
    <div className="App">
      <Simulator app={app} communities={comms} />
      <ConfigModal
        selectedCommunity={selectedCommunity}
        communityCount={communityCount}
        onChangeCommunityCount={(v) => setCommunityCount(v)}
        onAddPopulation={onAddPopulation}
        onRemovePopulation={onRemovePopulation}
        hidden={configHidden}
        onFinish={onFinishEnvSetting}
      />
      <Timeline hidden={!configHidden} day={day} />
    </div>
  );
}

export default Main;
