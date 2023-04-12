export abstract class StorageService<T> {
    abstract get(): Promise<T[]>;
    abstract set(value: T[]): Promise<void>;
}
