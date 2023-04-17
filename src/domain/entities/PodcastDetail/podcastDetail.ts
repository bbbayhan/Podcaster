export class PodcastDetail {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly date: string,
        public readonly duration: string,
        public readonly description: string,
        public readonly audio: string,
    ) { }
}