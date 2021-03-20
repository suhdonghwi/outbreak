import create from "zustand/vanilla";
import defaultParameter, { Parameter } from "../parameter";

const parameterStore = create<Parameter>((set) => ({
  ...defaultParameter,
}));

export const getParameterState = parameterStore.getState;
export const setParameterState = parameterStore.setState;

export default parameterStore;
