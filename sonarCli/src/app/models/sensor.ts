export class Sensor {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public latitude: number,
        public longitude: number,
        public hostname: string,
        public min: number,
        public max: number,)
        {}
}