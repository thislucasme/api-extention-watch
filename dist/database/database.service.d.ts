import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { ConfiguracaoTDOBanco } from 'src/types/types';
export declare class DatabaseService {
    private knex;
    private registroRestaurado;
    constructor(configService: ConfigService);
    getConnection(): Promise<Knex<any, unknown[]>>;
    getConnectionBanco(): Promise<Knex<any, unknown[]>>;
    getConfiguracao(): Promise<any[]>;
    findConfiguracao(conn: Knex<any, unknown[]>): Knex.QueryBuilder<unknown, {
        _base: unknown;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    salvarConfiguracao(dados: ConfiguracaoTDOBanco, userName: string): Promise<any>;
    salvarConfiguracaoBanco(conn: Knex<any, unknown[]>, dados: ConfiguracaoTDOBanco, userName: string): Knex.Raw<any>;
    updateConfiguracaoBanco(conn: Knex<any, unknown[]>, dados: ConfiguracaoTDOBanco, userName: string): Knex.Raw<any>;
    readEnv(): Promise<void>;
}
