export type ConfiguracaoTDO = {
    host: string;
    port: string;
    senha: string;
};
export type ConfiguracaoTDOBanco = {
    id: number;
    host: string;
    port: string;
    senha: string;
    usuario: string;
    banco: string;
};
export interface Modcon {
    contrato: number;
    nomecli: string;
    cidacli: string;
}
export interface ControleProcessos {
    id: number;
    baixar: number;
    enviar_erro_log: number;
    enviar_conciliacao: number;
    enviar_rejeicao_fiscal: number;
    receber_msgs: number;
    enviar_boletos: number;
    status: number;
    cobraca: number;
    tipo_atualizacao: number;
}
export interface OptionData {
    label: string;
    value: string;
}
export interface ControleProcessosTDO {
    contrato: string;
    razao_social: string;
    baixar: number;
    enviar_rejeicao_fiscal: number;
    receber_msgs: number;
    enviar_boletos: number;
    cobranca: number;
    enviar_erro_log: number;
    enviar_conciliacao: number;
}
