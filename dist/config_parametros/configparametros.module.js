"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParametrosModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const site_success_database_service_1 = require("../database/site-success-database.service");
const configparametros_controller_1 = require("./configparametros.controller");
const configparametros_service_1 = require("./configparametros.service");
let ConfigParametrosModule = class ConfigParametrosModule {
};
ConfigParametrosModule = __decorate([
    (0, common_1.Module)({
        imports: [site_success_database_service_1.SiteSuccessDatabaseService, database_module_1.DatabaseModule],
        controllers: [configparametros_controller_1.ConfigParametrosController],
        providers: [configparametros_service_1.ConfigParametrosService, site_success_database_service_1.SiteSuccessDatabaseService],
    })
], ConfigParametrosModule);
exports.ConfigParametrosModule = ConfigParametrosModule;
//# sourceMappingURL=configparametros.module.js.map