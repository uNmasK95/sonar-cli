export class Notification {
    constructor(
        public id: string,
        public zone: string,
        public sensor: string,
        public min: number,
        public max: number,      
        public value: number,
        public description: string,
        public timestamp: string)
        {}
}