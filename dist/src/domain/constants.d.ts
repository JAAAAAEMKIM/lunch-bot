export declare const MEAL: {
    readonly DINNER: "dinner";
    readonly LUNCH: "lunch";
};
export type MEAL = (typeof MEAL)[keyof typeof MEAL];
export declare const COURSE_TYPE: {
    readonly STANDARD: "standard";
    readonly PLUS: "plus";
    readonly LUNCHBOX: "lunchbox";
};
export type COURSE_TYPE = (typeof COURSE_TYPE)[keyof typeof COURSE_TYPE];
