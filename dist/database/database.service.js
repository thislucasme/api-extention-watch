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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
const knexCache_1 = require("./knexCache");
let DatabaseService = class DatabaseService {
    constructor(configService) {
        const host = configService.get('atualizacaoAutomatica.host');
        if (!host)
            throw new Error('VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_HOST NÃO CONFIGURADA!');
        const port = configService.get('atualizacaoAutomatica.port');
        if (!port)
            throw new Error('VARIAVEL DE AMBIENTE ATUALIZACAO_DB_PORT NÃO CONFIGURADA!');
        const user = configService.get('atualizacaoAutomatica.user');
        if (!user)
            throw new Error('VARIAVEL DE AMBIENTE ATUALIZACAO_DB_USER NÃO CONFIGURADA!');
        const password = configService.get('atualizacaoAutomatica.password');
        if (!password)
            throw new Error('VARIAVEL DE AMBIENTE ATUALIZACAO_DB_PASS NÃO CONFIGURADA!');
        const database = configService.get('atualizacaoAutomatica.name');
        if (!database)
            throw new Error('VARIAVEL DE AMBIENTE ATUALIZACAO_DB_NAME NÃO CONFIGURADA!');
        this.registroRestaurado = {
            servidor: host,
            banco: database,
            usuario: user,
            senha: password,
            porta: port,
            servidorHex: host,
            bcohex: database,
        };
    }
    async getConnection() {
        const result = await this.getConfiguracao();
        const isVazio = result.length ? true : false;
        if (!isVazio)
            throw new common_1.HttpException('Configuração está vazia', common_1.HttpStatus.NO_CONTENT);
        const dadosConfiguracao = result[0];
        const dadosServer = {
            servidor: dadosConfiguracao === null || dadosConfiguracao === void 0 ? void 0 : dadosConfiguracao.host,
            banco: dadosConfiguracao === null || dadosConfiguracao === void 0 ? void 0 : dadosConfiguracao.banco,
            usuario: dadosConfiguracao === null || dadosConfiguracao === void 0 ? void 0 : dadosConfiguracao.usuario,
            senha: dadosConfiguracao === null || dadosConfiguracao === void 0 ? void 0 : dadosConfiguracao.senha,
            porta: dadosConfiguracao === null || dadosConfiguracao === void 0 ? void 0 : dadosConfiguracao.port,
            servidorHex: dadosConfiguracao === null || dadosConfiguracao === void 0 ? void 0 : dadosConfiguracao.host,
            bcohex: dadosConfiguracao === null || dadosConfiguracao === void 0 ? void 0 : dadosConfiguracao.banco,
        };
        const conn = await (0, knexCache_1.getOrCreateKnexInstanceDatabase)(dadosServer);
        return conn;
    }
    async getConnectionBanco() {
        const conn = await (0, knexCache_1.getOrCreateKnexInstance)(this.registroRestaurado);
        return conn;
    }
    async getConfiguracao() {
        const conn = await this.getConnectionBanco();
        const query = this.findConfiguracao(conn);
        try {
            return await query;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Ocorreu um erro no servidor');
        }
    }
    findConfiguracao(conn) {
        return conn.select().from('configuracao_banco_dados').limit(1);
    }
    async salvarConfiguracao(dados, userName) {
        const conn = await this.getConnectionBanco();
        const queryFindConfiguracao = this.findConfiguracao(conn);
        if ((await queryFindConfiguracao).length > 0) {
            const query = this.updateConfiguracaoBanco(conn, dados, userName);
            return await query;
        }
        const query = this.salvarConfiguracaoBanco(conn, dados, userName);
        return await query;
    }
    salvarConfiguracaoBanco(conn, dados, userName) {
        try {
            return conn.raw(`insert into configuracao_banco_dados
        values(1, '${dados === null || dados === void 0 ? void 0 : dados.host}', '${dados === null || dados === void 0 ? void 0 : dados.port}',
        '${dados === null || dados === void 0 ? void 0 : dados.senha}', '${userName}', '${dados === null || dados === void 0 ? void 0 : dados.usuario}', '${dados === null || dados === void 0 ? void 0 : dados.banco}')`);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Ocorreu um erro no servidor');
        }
    }
    updateConfiguracaoBanco(conn, dados, userName) {
        try {
            return conn.raw(`UPDATE configuracao_banco_dados SET 
        host = '${dados === null || dados === void 0 ? void 0 : dados.host}', port = '${dados === null || dados === void 0 ? void 0 : dados.port}',
        senha = '${dados === null || dados === void 0 ? void 0 : dados.senha}',
        created_by = '${userName}',
        usuario = '${dados === null || dados === void 0 ? void 0 : dados.usuario}',
        banco = '${dados === null || dados === void 0 ? void 0 : dados.banco}'
        WHERE (id = '1');

    `);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Ocorreu um erro no servidor');
        }
    }
    async readEnv() {
        (0, fs_1.readFile)(".env", "utf8", (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            else {
            }
        });
        let data = [];
        const conn = await this.getConnectionBanco();
        const query = this.findConfiguracao(conn);
        let configuracao;
        try {
            const result = await query;
            configuracao = result[0];
            data.push("chave_autentication=6567856lj\n");
            data.push("# Chave de criptografia usada no Success\n");
            data.push("CHAVE_CRIPTO=Success2021\n");
            data.push("\n");
            data.push("ATUALIZACAO_DB_HOST=success.vps-kinghost.net\n");
            data.push("ATUALIZACAO_DB_USER=root\n");
            data.push("ATUALIZACAO_DB_PASS=success123\n");
            data.push("ATUALIZACAO_DB_DATABASE=atualizacao_automatica\n");
            data.push("ATUALIZACAO_DB_PORT=3309\n");
            data.push('\n');
            data.push('# Banco de dados do site da Success, de onde é puxado os registros de conexões\n');
            data.push('# do sincronismo dos clientes (tabela cfgw)\n');
            data.push(`SITE_SUCCESS_DB_HOST=${configuracao === null || configuracao === void 0 ? void 0 : configuracao.host}\n`);
            data.push(`SITE_SUCCESS_DB_NAME=successtestes01\n`);
            data.push(`SITE_SUCCESS_DB_USER=${configuracao === null || configuracao === void 0 ? void 0 : configuracao.usuario}\n`);
            data.push(`SITE_SUCCESS_DB_PASSWORD=${configuracao === null || configuracao === void 0 ? void 0 : configuracao.senha}\n`);
            data.push(`SITE_SUCCESS_DB_PORT=${configuracao === null || configuracao === void 0 ? void 0 : configuracao.port}\n`);
            (0, fs_1.writeFile)('.env', data.join(""), (err) => {
                if (err)
                    throw err;
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Ocorreu um erro no servidor');
        }
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map