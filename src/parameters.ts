export interface Parameters {
    personRadius: number;
    personSpeed: number;
    infectCircleRadius: number;
    borderWidth: number;
    infectProbability: number;
    killTimer: number;
    migrateInterval: number;
}

const defaultParams: Parameters = {
    personRadius: 8,
    personSpeed: 2,
    infectCircleRadius: 30,
    borderWidth: 4,
    infectProbability: 1,
    killTimer: 3,
    migrateInterval: 0.1,
};

export default defaultParams;
