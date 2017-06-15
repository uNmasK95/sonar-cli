export class Zone {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public type: number,
        public min: number,
        public max: number)
        {}
}