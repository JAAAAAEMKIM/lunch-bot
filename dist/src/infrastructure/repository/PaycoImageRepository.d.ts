import { ImageRepository } from '@/application/repository/ImageRepository';
declare class PaycoImageRepository implements ImageRepository {
    private imageMap;
    init(): Promise<void>;
    getByTitle(title: string): Promise<string>;
}
export default PaycoImageRepository;
