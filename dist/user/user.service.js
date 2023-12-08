"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const database_service_1 = require("../database/database.service");
const site_success_database_service_1 = require("../database/site-success-database.service");
let UserService = class UserService {
    constructor(siteSuccess, databaseService) {
        this.siteSuccess = siteSuccess;
        this.databaseService = databaseService;
    }
    async findByUser(username) {
        const users = this.readUsersFromJsonFile();
        const user = users.find(u => u.email === username);
        return user;
    }
    async findDadosAdmByUser(user) {
        const userDados = {
            email: "lucas@gmail.com",
            password: "12345"
        };
        return userDados;
    }
    readUsersFromJsonFile() {
        const filePath = 'users.json';
        try {
            const fileContent = (0, fs_1.readFileSync)(filePath, 'utf-8');
            const users = JSON.parse(fileContent);
            return users;
        }
        catch (error) {
            console.error(`Error reading users from ${filePath}:`, error);
            return [];
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [site_success_database_service_1.SiteSuccessDatabaseService, database_service_1.DatabaseService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map