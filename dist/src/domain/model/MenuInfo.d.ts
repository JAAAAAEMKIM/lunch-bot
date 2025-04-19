declare class MenuInfo {
    name: string;
    calory?: number | undefined;
    protein?: number | undefined;
    constructor(name: string, calory?: number | undefined, protein?: number | undefined);
    toDisplayDto(): {
        name: string;
        calory: number | undefined;
        protein: number | undefined;
    };
}
export default MenuInfo;
