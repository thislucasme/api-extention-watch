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
exports.ConfiguracaoBancoController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const currentUser_1 = require("../auth/utils/currentUser");
const database_service_1 = require("../database/database.service");
let ConfiguracaoBancoController = class ConfiguracaoBancoController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getConfig() {
        const result = await this.databaseService.getConfiguracao();
        const isVazio = result.length ? true : false;
        if (!isVazio)
            throw new common_1.HttpException('', common_1.HttpStatus.NO_CONTENT);
        return result[0];
    }
    async salvarConfiguracao(dados, user) {
        var _a;
        const result = await this.databaseService.salvarConfiguracao(dados, user === null || user === void 0 ? void 0 : user.username);
        if (((_a = result[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) > 0)
            throw new common_1.HttpException('Dados salvos com sucesso!', common_1.HttpStatus.CREATED);
        throw new common_1.HttpException('Ocorreu um erro no servidor!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async teste() {
        const result = await this.databaseService.getConnection();
        const query = result.select().from('usuarios');
        return await query;
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfiguracaoBancoController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfiguracaoBancoController.prototype, "salvarConfiguracao", null);
__decorate([
    (0, common_1.Get)('teste'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfiguracaoBancoController.prototype, "teste", null);
ConfiguracaoBancoController = __decorate([
    (0, common_1.Controller)('configuracao-db'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ConfiguracaoBancoController);
exports.ConfiguracaoBancoController = ConfiguracaoBancoController;
//# sourceMappingURL=configuracao-banco.controller.js.map