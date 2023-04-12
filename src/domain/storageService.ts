export abstract class StorageService<T> {
    abstract get(): Promise<T[]>;
    abstract set(value: T[]): Promise<void>;
}

export abstract class StorageDetailService<T> {
    abstract get(podcastId: string): Promise<T>;
    abstract set(values: T, podcastId: string): Promise<void>;
}