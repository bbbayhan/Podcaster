export abstract class StorageService<T> {
    abstract get(): Promise<T[]>;
    abstract set(value: T[]): Promise<void>;
    abstract getOne(podcastId: string): Promise<T>;
    abstract setOne(values: T, podcastId: string): Promise<void>;
}