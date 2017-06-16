import { Grafic } from "./grafic";

export class Row {
    constructor(
        public id: number,
        public name: string,
        public grafics : Grafic[])
        {}
}