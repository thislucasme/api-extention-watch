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
exports.ConfigParametrosService = void 0;
const common_1 = require("@nestjs/common");
const site_success_database_service_1 = require("../database/site-success-database.service");
const database_service_1 = require("../database/database.service");
let ConfigParametrosService = class ConfigParametrosService {
    constructor(siteSuccess, databaseService) {
        this.siteSuccess = siteSuccess;
        this.databaseService = databaseService;
    }
    async getConfig(user) {
        const conn = await this.databaseService.getConnectionBanco();
        try {
            const result = await conn.raw(`select * from configuracao_parametro_logs limit 1`);
            return result[0];
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async setConfig(body, user) {
        var _a;
        const conn = await this.databaseService.getConnectionBanco();
        const config = await this.getConfig(user);
        const result = ((_a = config[0]) === null || _a === void 0 ? void 0 : _a.id_usuario) ? true : false;
        try {
            if (result) {
                return await conn.raw(`update configuracao_parametro_logs
          set id_usuario = '${user === null || user === void 0 ? void 0 : user.userId}',
          tempo_delete_registros_log = ${body.tempo_eliminacao_log},
          tempo_delete_pendencia_conciliacao = ${body.tempo_eliminacao_pendencia_concliliacao},
          tempo_delete_rejeicoes_fiscais = ${body.tempo_eliminacao_rejeicoes}`);
            }
            else {
                return await conn.raw(`insert into configuracao_parametro_logs values(1, '${user.userId}', ${body.tempo_eliminacao_log}, ${body.tempo_eliminacao_pendencia_concliliacao}, ${body.tempo_eliminacao_rejeicoes})`);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
ConfigParametrosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [site_success_database_service_1.SiteSuccessDatabaseService, database_service_1.DatabaseService])
], ConfigParametrosService);
exports.ConfigParametrosService = ConfigParametrosService;
//# sourceMappingURL=configparametros.service.js.map