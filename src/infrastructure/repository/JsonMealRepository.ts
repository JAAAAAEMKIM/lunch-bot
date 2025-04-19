import { MealRepository } from '@/application/repository/MealRepository';
import WeeklyData from '@/domain/model/WeeklyData';
import { WeeklyDataDto } from '@/domain/types';
import getIndices from '@/infrastructure/utils/getIndices';
import fs from 'fs/promises';

export class JsonMealRepository implements MealRepository {
  constructor(private jsonFilePath: string) {}

  /**
   * JSON 파일에서 주간 식단 데이터를 불러옵니다.
   */
  async getWeeklyMeals() {
    try {
      const data = await fs.readFile(this.jsonFilePath, 'utf8');
      const dto = JSON.parse(data) as WeeklyDataDto;
      return new WeeklyData(dto, getIndices());
    } catch (error) {
      console.error('식단 데이터를 불러오는 중 오류가 발생했습니다:', error);
      throw new Error('식단 데이터를 불러올 수 없습니다.');
    }
  }

  /**
   * 주간 식단 데이터를 JSON 파일로 저장합니다.
   * @param data 저장할 주간 식단 데이터
   */
  async saveWeeklyMeals(data: WeeklyDataDto) {
    try {
      await fs.writeFile(this.jsonFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('식단 데이터를 저장하는 중 오류가 발생했습니다:', error);
      throw new Error('식단 데이터를 저장할 수 없습니다.');
    }
  }
}
