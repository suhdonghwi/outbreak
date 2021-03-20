export interface Parameter {
  [key: string]: any;
  personSpeed: number;
  infectCircleRadius: number;
  infectProbability: number;
  killTimer: number;
  migrateInterval: number;
}

const defaultParameter: Parameter = {
  personSpeed: 2,
  infectCircleRadius: 30,
  infectProbability: 1,
  killTimer: 3,
  migrateInterval: 0.1,
};

export const personRadius = 8;
export const borderWidth = 4;

export default defaultParameter;
