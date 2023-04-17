export class Podcast {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly autor: string,
        public readonly imageSource: string,
        public readonly description: string,
    ) { }
}