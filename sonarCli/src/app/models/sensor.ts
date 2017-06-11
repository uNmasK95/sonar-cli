export class Sensor {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public latitude: number,
        public longitude: number,
        public zone: number)
        {}
}