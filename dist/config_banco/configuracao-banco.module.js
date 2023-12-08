"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguracaoBancoModule = void 0;
const configuracao_banco_controller_1 = require("./configuracao-banco.controller");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
let ConfiguracaoBancoModule = class ConfiguracaoBancoModule {
};
ConfiguracaoBancoModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [configuracao_banco_controller_1.ConfiguracaoBancoController],
    })
], ConfiguracaoBancoModule);
exports.ConfiguracaoBancoModule = ConfiguracaoBancoModule;
//# sourceMappingURL=configuracao-banco.module.js.map