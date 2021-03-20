export interface Parameter {
  [key: string]: any;
  personSpeed: number;
  infectCircleRadius: number;
  infectProbability: number;
  killTimer: number;
  migrateInterval: number;

  randomlyInfect: number;
}

const defaultParameter: Parameter = {
  personSpeed: 2,
  infectCircleRadius: 30,
  infectProbability: 1,
  killTimer: 3,
  migrateInterval: 0.3,

  randomlyInfect: 2,
};

export const personRadius = 8;
export const borderWidth = 3;

export default defaultParameter;
