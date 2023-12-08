import { Knex } from 'knex';
import * as moment from 'moment';
import { ControleProcessosTDO, OptionData } from 'src/types/types';
export declare const gerarObjetosEntreDatas: (startDate: moment.Moment, endDate: moment.Moment) => Promise<any[]>;
export declare const isAdm: (user: string) => boolean;
export declare const invertDate: (date: string) => string;
export declare const getTipoString: (tipo: any) => string;
export declare function convertOptions(apiOptions: any[]): OptionData[];
export declare function getEmpresaPorContrato(contrato: string, conn: Knex<any, unknown[]>): Knex.QueryBuilder<unknown, {
    _base: unknown;
    _hasSelection: true;
    _keys: "contrato" | "nomecli as razao_social";
    _aliases: {};
    _single: false;
    _intersectProps: {};
    _unionProps: never;
}[]>;
export declare function getEmpresaPorContratoConfiguracao(contrato: string, conn: Knex<any, unknown[]>): Knex.QueryBuilder<any, {
    _base: any;
    _hasSelection: true;
    _keys: "A.contrato" | "A.nomecli as razao_social" | "B.baixar" | "B.enviar_rejeicao_fiscal" | "B.receber_msgs" | "B.enviar_boletos" | "B.cobranca" | "B.enviar_erro_log" | "B.enviar_conciliacao";
    _aliases: {};
    _single: false;
    _intersectProps: {};
    _unionProps: never;
}[]>;
export declare function getConfiguracaoEmpresaPorContratoConfiguracao(body: ControleProcessosTDO, conn: Knex<any, unknown[]>): Knex.QueryBuilder<unknown, number[]>;
export declare function updateConfiguracaoPorContrato(body: ControleProcessosTDO, conn: Knex<any, unknown[]>): Knex.QueryBuilder<unknown, number>;
export declare function getExiste(contrato: string, conn: Knex<any, unknown[]>): Knex.QueryBuilder<unknown, {
    _base: unknown;
    _hasSelection: false;
    _keys: never;
    _aliases: {};
    _single: false;
    _intersectProps: {};
    _unionProps: never;
}[]>;
export declare function obterCodigo(nome: any): string;
