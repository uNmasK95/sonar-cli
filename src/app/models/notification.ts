export class Notification {
    constructor(
        public id: number,
        public sensor: string,
        public zone: string,
        public description: string,
        public date: Date)
        {}
}