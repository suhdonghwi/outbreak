import { AssertsIdentifierTypePredicate } from "typescript";
import create from "zustand/vanilla";

type SimulatorStatus = "configure" | "paused" | "playing";

type State = {
  status: SimulatorStatus;
};

const simulatorStore = create<State>((set) => ({
  status: "configure",
}));

export const getSimulatorState = simulatorStore.getState;
export const setSimulatorState = simulatorStore.setState;

export default simulatorStore;
