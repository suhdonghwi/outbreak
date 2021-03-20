export interface Event {
  personSpeed: number;
  infectCircleRadius: number;
  infectProbability: number;
  killTimer: number;
  migrateInterval: number;
}

const defaultEvent: Event = {
  personSpeed: 2,
  infectCircleRadius: 30,
  infectProbability: 1,
  killTimer: 3,
  migrateInterval: 0.1,
};

export type EventTimeline = Record<number, Event>;

export const personRadius = 8;
export const borderWidth = 4;

export default defaultEvent;
