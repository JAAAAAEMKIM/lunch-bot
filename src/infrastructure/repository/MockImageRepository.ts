import { ImageRepository } from '@/application/repository/ImageRepository';

class MockImageRepository implements ImageRepository {
  getByTitle(title: string) {
    return Promise.resolve(
      'http://image.toast.com/aaaaac/shopmenu/202504/menu_29_20250418115005879.jpg?750x500'
    );
  }
}

export default MockImageRepository;
