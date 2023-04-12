export abstract class HTTPService<T> {
  abstract get(): Promise<T[]>;
}
