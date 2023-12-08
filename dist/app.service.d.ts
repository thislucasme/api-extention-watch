export declare class AppService {
    getHello(): string;
    saveJsonToFile(jsonData: any, filePath: string): void;
    readJsonFromFile(filePath: string): Promise<any>;
}
