

import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { DatabaseService } from 'src/database/database.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';

@Injectable()
export class UserService {
	constructor(private readonly siteSuccess: SiteSuccessDatabaseService, private databaseService: DatabaseService) { }


	async findByUser(username: string) {
        const users = this.readUsersFromJsonFile();
        const user = users.find(u => u.email === username);
        return user;
    }

	async findDadosAdmByUser(user : string) {
		const userDados = {
			email: "lucas@gmail.com",
			password: "12345"
		}
		return userDados;

	}
    private readUsersFromJsonFile(): any[] {
        // Assuming your JSON file is named 'users.json' and located in the same directory as this service
        const filePath = 'users.json';

        try {
            const fileContent = readFileSync(filePath, 'utf-8');
            const users = JSON.parse(fileContent);
            return users;
        } catch (error) {
            console.error(`Error reading users from ${filePath}:`, error);
            return [];
        }
    }

}


