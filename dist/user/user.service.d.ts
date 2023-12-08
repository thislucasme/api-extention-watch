import { DatabaseService } from 'src/database/database.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
export declare class UserService {
    private readonly siteSuccess;
    private databaseService;
    constructor(siteSuccess: SiteSuccessDatabaseService, databaseService: DatabaseService);
    findByUser(username: string): Promise<any>;
    findDadosAdmByUser(user: string): Promise<{
        email: string;
        password: string;
    }>;
    private readUsersFromJsonFile;
}
