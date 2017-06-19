import { Metric } from "app/models/metric";

export class Grafic {
    constructor(
        public id: string,
        public name: string,
        public rangeTime: number,
        public metric : Metric[]
    ) {}
}