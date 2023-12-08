"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const fs_1 = require("fs");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    saveJsonToFile(jsonData, filePath) {
        const jsonString = JSON.stringify(jsonData, null, 2);
        try {
            fs.writeFileSync(filePath, jsonString);
            console.log(`JSON salvo com sucesso em: ${filePath}`);
        }
        catch (error) {
            console.error(`Erro ao salvar o JSON: ${error.message}`);
        }
    }
    async readJsonFromFile(filePath) {
        try {
            const fileContent = await fs_1.promises.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        }
        catch (error) {
            throw new Error('Error reading JSON from file: ' + error.message);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map