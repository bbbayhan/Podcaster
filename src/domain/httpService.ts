export abstract class HTTPService<T> {
  abstract get(): Promise<T[]>;
  abstract getOne(podcastId: string): Promise<T>;
}