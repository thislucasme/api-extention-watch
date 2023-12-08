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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const path = require("path");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    saveJson(jsonData) {
        const fileName = 'seu-arquivo.json';
        const rootPath = path.resolve(__dirname, '..');
        const filePath = path.join(rootPath, fileName);
        jsonData.host = jsonData.host || { paused: true, prontoParaReproducao: false, currentTime: 0 };
        this.appService.saveJsonToFile(jsonData, filePath);
        return { watcher: 'host', status: 200 };
    }
    atualizarJson(jsonData) {
        const fileName = 'seu-arquivo.json';
        const rootPath = path.resolve(__dirname, '..');
        const filePath = path.join(rootPath, fileName);
        try {
            jsonData.host = jsonData.host || { paused: true, prontoParaReproducao: false, currentTime: 0 };
            this.appService.saveJsonToFile(jsonData, filePath);
            return { watcher: 'host', status: 200 };
        }
        catch (error) {
            console.error('Erro ao analisar o conteúdo do arquivo JSON existente:', error);
            return { watcher: 'error', status: 500, message: 'Erro ao analisar o conteúdo do arquivo JSON.' };
        }
    }
    async getJson(res) {
        const fileName = 'seu-arquivo.json';
        const rootPath = path.resolve(__dirname, '..');
        const filePath = path.join(rootPath, fileName);
        try {
            const jsonData = await this.appService.readJsonFromFile(filePath);
            res.json(jsonData);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao ler o JSON' });
        }
    }
};
__decorate([
    (0, common_1.Post)('/sincronizar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "saveJson", null);
__decorate([
    (0, common_1.Post)('/atualizar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "atualizarJson", null);
__decorate([
    (0, common_1.Get)('/get-json'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getJson", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map