import { ImageRepository } from '@/application/repository/ImageRepository';
import { load as parseHtml } from 'cheerio';

const fetchMenuHtml = async () => {
  const date = new Date();
  const dateParam = `${date.getFullYear()}${String(
    date.getMonth() + 1
  ).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  const result = await fetch(`${process.env.PAYCO_MENU_URL}${dateParam}`);

  if (!result.ok) {
    throw new Error('Bad Request');
  }

  return result.text();
};

class PaycoImageRepository implements ImageRepository {
  private imageMap: Record<string, string> | null = null;

  async init() {
    try {
      const $ = parseHtml(await fetchMenuHtml());
      this.imageMap = {};

      $('.item_menu').each((i, el) => {
        const title = $(el).find('.menu_title').text().trim();
        const image = $(el).find('.menu_img_box img').attr('src') ?? '';
        this.imageMap![title] = image;
      });
    } catch (error) {
      console.error('Request went wrong. please Retry.', error);
      return;
    }
  }
  async getByTitle(title: string): Promise<string> {
    if (!this.imageMap) {
      await this.init();
    }

    console.log(title, this.imageMap?.[title]);

    return this.imageMap?.[title] ?? '';
  }
}

export default PaycoImageRepository;
