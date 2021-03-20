export interface Parameters {
  personSpeed: number;
  infectCircleRadius: number;
  infectProbability: number;
  killTimer: number;
  migrateInterval: number;
}

const defaultParams: Parameters = {
  personSpeed: 2,
  infectCircleRadius: 30,
  infectProbability: 1,
  killTimer: 3,
  migrateInterval: 0.1,
};

export const personRadius = 8;
export const borderWidth = 4;

export default defaultParams;
