"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseName = exports.PendenciasConciliacaoColumn = exports.RejeicoesFiscaisColumn = exports.ErrosLogColumn = exports.ControleProcessosColumnName = exports.Da37 = exports.ModconColumnName = exports.ControleAtualizacaoColumnName = void 0;
var ControleAtualizacaoColumnName;
(function (ControleAtualizacaoColumnName) {
    ControleAtualizacaoColumnName["id"] = "id";
    ControleAtualizacaoColumnName["codigoVersao"] = "codigo_versao";
    ControleAtualizacaoColumnName["contrato"] = "contrato";
    ControleAtualizacaoColumnName["empresa"] = "empresa";
    ControleAtualizacaoColumnName["codigoMaquina"] = "codregser";
    ControleAtualizacaoColumnName["codigoUsuarioSuccess"] = "cd_usuario";
    ControleAtualizacaoColumnName["nomeUsuarioSuccess"] = "nome_usuario";
    ControleAtualizacaoColumnName["statusExecucao"] = "status_execucao";
    ControleAtualizacaoColumnName["statusAtualizacao"] = "status_atualizacao";
    ControleAtualizacaoColumnName["dataAtualizacao"] = "dt_atualizacao";
    ControleAtualizacaoColumnName["dataAgendamento"] = "dt_agendada";
})(ControleAtualizacaoColumnName = exports.ControleAtualizacaoColumnName || (exports.ControleAtualizacaoColumnName = {}));
var ModconColumnName;
(function (ModconColumnName) {
    ModconColumnName["contrato"] = "contrato";
    ModconColumnName["razaoSocial"] = "nomecli";
    ModconColumnName["cidade"] = "cidacli";
})(ModconColumnName = exports.ModconColumnName || (exports.ModconColumnName = {}));
var Da37;
(function (Da37) {
    Da37["vendedor"] = "vendedor17";
})(Da37 = exports.Da37 || (exports.Da37 = {}));
var ControleProcessosColumnName;
(function (ControleProcessosColumnName) {
    ControleProcessosColumnName["contrato"] = "contrato";
    ControleProcessosColumnName["razaoSocial"] = "nomecli";
    ControleProcessosColumnName["cidade"] = "cidacli";
    ControleProcessosColumnName["idControleProcessos"] = "id";
    ControleProcessosColumnName["baixar"] = "baixar";
    ControleProcessosColumnName["enviarErroLog"] = "enviar_erro_log";
    ControleProcessosColumnName["enviarConciliacao"] = "enviar_conciliacao";
    ControleProcessosColumnName["enviarRejeicaoFiscal"] = "enviar_rejeicao_fiscal";
    ControleProcessosColumnName["receberMensagem"] = "receber_msgs";
    ControleProcessosColumnName["enviarBoleto"] = "enviar_boletos";
    ControleProcessosColumnName["status"] = "status";
    ControleProcessosColumnName["cobranca"] = "cobranca";
    ControleProcessosColumnName["tipoAtualizacao"] = "tipo_atualizacao";
})(ControleProcessosColumnName = exports.ControleProcessosColumnName || (exports.ControleProcessosColumnName = {}));
var ErrosLogColumn;
(function (ErrosLogColumn) {
    ErrosLogColumn["id"] = "id";
    ErrosLogColumn["cod_versao"] = "cod_versao";
    ErrosLogColumn["contrato"] = "contrato";
    ErrosLogColumn["programa"] = "programa";
    ErrosLogColumn["data_exe"] = "dt_exe";
    ErrosLogColumn["desc_simplificada"] = "desc_simplificada";
    ErrosLogColumn["dados_erro"] = "dados_erro";
    ErrosLogColumn["empresa"] = "empresa";
    ErrosLogColumn["data_ocorrencia"] = "dt_ocorrencia";
    ErrosLogColumn["datlan"] = "datlan";
    ErrosLogColumn["titulo"] = "titulo";
})(ErrosLogColumn = exports.ErrosLogColumn || (exports.ErrosLogColumn = {}));
var RejeicoesFiscaisColumn;
(function (RejeicoesFiscaisColumn) {
    RejeicoesFiscaisColumn["id"] = "id";
    RejeicoesFiscaisColumn["contrato"] = "contrato";
    RejeicoesFiscaisColumn["codigo_rejeicao"] = "cod_rejeicao";
    RejeicoesFiscaisColumn["descricao"] = "descricao";
    RejeicoesFiscaisColumn["numero_documento"] = "num_documento";
    RejeicoesFiscaisColumn["serie"] = "serie";
    RejeicoesFiscaisColumn["data_exe"] = "dt_exe";
    RejeicoesFiscaisColumn["data_ocorrencia"] = "dt_ocorrencia";
    RejeicoesFiscaisColumn["tipodoc"] = "tipodoc";
    RejeicoesFiscaisColumn["datlan"] = "datlan";
})(RejeicoesFiscaisColumn = exports.RejeicoesFiscaisColumn || (exports.RejeicoesFiscaisColumn = {}));
var PendenciasConciliacaoColumn;
(function (PendenciasConciliacaoColumn) {
    PendenciasConciliacaoColumn["id"] = "id";
    PendenciasConciliacaoColumn["contrato"] = "contrato";
    PendenciasConciliacaoColumn["dataOcorrencia"] = "datdiv1";
})(PendenciasConciliacaoColumn = exports.PendenciasConciliacaoColumn || (exports.PendenciasConciliacaoColumn = {}));
var DatabaseName;
(function (DatabaseName) {
    DatabaseName["name"] = "atualizacao_automatica";
})(DatabaseName = exports.DatabaseName || (exports.DatabaseName = {}));
//# sourceMappingURL=enuns.js.map