import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    saveJson(jsonData: any): {
        watcher: string;
        status: number;
    };
    atualizarJson(jsonData: any): {
        watcher: string;
        status: number;
        message?: undefined;
    } | {
        watcher: string;
        status: number;
        message: string;
    };
    getJson(res: Response): Promise<void>;
}
