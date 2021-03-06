import { UniqueIdHelper } from "./UniqueIdHelper";

export class ArrayHelper {
    static getIds(array: any[], propertyName: string) {
        const result: string[] = [];
        for (const item of array) {
            const id = item[propertyName];
            if (!UniqueIdHelper.isMissing(id) && result.indexOf(id) === -1) result.push(id);
        }
        return result;
    }

    static getOne(array: any[], propertyName: string, value: any) {
        for (const item of array) if (item[propertyName] === value) return item;
        return null
    }

    static getAll(array: any[], propertyName: string, value: any) {
        const result: any[] = []
        for (const item of array) if (item[propertyName] === value) result.push(item);
        return result;
    }

    static fillArray(contents: string, length: number) {
        const result = [];
        for (let i = 0; i < length; i++) result.push(contents);
        return result;
    }
}
