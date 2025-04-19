import Course from "@/domain/model/Course";
import { MenuIndices } from "@/domain/model/MenuInfo";
import { WeeklyDataDto } from "@/domain/types";
declare class WeeklyData {
    private dto;
    private indices;
    constructor(dto: WeeklyDataDto, indices: MenuIndices);
    at(index: number): {
        lunch: Course[];
        dinner: Course[];
    };
}
export default WeeklyData;
