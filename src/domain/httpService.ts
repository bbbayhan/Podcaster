export abstract class HTTPService<T> {
  abstract get(): Promise<T[]>;
}

export abstract class HTTPDetailService<T> {
  abstract get(podcastId: string): Promise<T>;
}