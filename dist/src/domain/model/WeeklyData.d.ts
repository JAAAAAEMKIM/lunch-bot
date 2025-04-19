import Course from '@/domain/model/Course';
import { WeeklyDataDto } from '@/domain/types';
declare class WeeklyData {
    private dto;
    constructor(dto: WeeklyDataDto);
    at(index: number): {
        lunch: Course[];
        dinner: Course[];
    };
}
export default WeeklyData;
