import { ImageRepository } from '@/application/repository/ImageRepository';
declare class MockImageRepository implements ImageRepository {
    getByTitle(title: string): Promise<string>;
}
export default MockImageRepository;
