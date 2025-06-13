export interface ImageRepository {
    getByTitle(title: string): Promise<string>;
}
