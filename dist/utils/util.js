"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterCodigo = exports.getExiste = exports.updateConfiguracaoPorContrato = exports.getConfiguracaoEmpresaPorContratoConfiguracao = exports.getEmpresaPorContratoConfiguracao = exports.getEmpresaPorContrato = exports.convertOptions = exports.getTipoString = exports.invertDate = exports.isAdm = exports.gerarObjetosEntreDatas = void 0;
const moment = require("moment");
const enuns_1 = require("../enuns/enuns");
const enunsTableNames_1 = require("../enuns/enunsTableNames");
moment().locale('pt-br');
const gerarObjetosEntreDatas = async (startDate, endDate) => {
    const result = [];
    let currentDate = moment(startDate);
    while (currentDate <= moment(endDate)) {
        result.push({
            data: currentDate.format('DD/MM/YYYY'),
            ocorrencia: 0
        });
        currentDate = currentDate.add(1, 'days');
    }
    return result;
};
exports.gerarObjetosEntreDatas = gerarObjetosEntreDatas;
const isAdm = (user) => {
    const userSplited = user.split("@");
    if (userSplited.length > 1) {
        return true;
    }
    return false;
};
exports.isAdm = isAdm;
const invertDate = (date) => {
    const texto = date.split('-').reverse().join('-');
    return texto;
};
exports.invertDate = invertDate;
const getTipoString = (tipo) => {
    switch (tipo) {
        case 1:
            return "Sim";
        case 2:
            return "Não";
        case null:
            return null;
        default:
            return "Tipo desconhecido";
    }
};
exports.getTipoString = getTipoString;
function convertOptions(apiOptions) {
    return apiOptions.map((item) => ({
        label: item.originalname,
        value: item.filename
    }));
}
exports.convertOptions = convertOptions;
function getEmpresaPorContrato(contrato, conn) {
    const queryNomeEmpresa = conn
        .select(`${enuns_1.ModconColumnName.contrato}`, `${enuns_1.ModconColumnName.razaoSocial} as razao_social`).from(`${enunsTableNames_1.TablesName.modcon}`)
        .where(`${enuns_1.ModconColumnName.contrato}`, '=', contrato);
    return queryNomeEmpresa;
}
exports.getEmpresaPorContrato = getEmpresaPorContrato;
function getEmpresaPorContratoConfiguracao(contrato, conn) {
    const queryNomeEmpresa = conn
        .select(`A.${enuns_1.ModconColumnName.contrato}`, `A.${enuns_1.ModconColumnName.razaoSocial} as razao_social`, `B.${enuns_1.ControleProcessosColumnName.baixar}`, `B.${enuns_1.ControleProcessosColumnName.enviarRejeicaoFiscal}`, `B.${enuns_1.ControleProcessosColumnName.receberMensagem}`, `B.${enuns_1.ControleProcessosColumnName.enviarBoleto}`, `B.${enuns_1.ControleProcessosColumnName.cobranca}`, `B.${enuns_1.ControleProcessosColumnName.enviarErroLog}`, `B.${enuns_1.ControleProcessosColumnName.enviarConciliacao}`).from(`${enunsTableNames_1.TablesName.modcon} as A`)
        .join('controle_processos as B', 'B.contrato', 'A.contrato')
        .where(`A.${enuns_1.ModconColumnName.contrato}`, '=', contrato);
    return queryNomeEmpresa;
}
exports.getEmpresaPorContratoConfiguracao = getEmpresaPorContratoConfiguracao;
function getConfiguracaoEmpresaPorContratoConfiguracao(body, conn) {
    const queryNomeEmpresa = conn
        .insert(Object.assign({}, body)).from(`${enunsTableNames_1.TablesName.controleProcessos}`)
        .where(`${enuns_1.ControleProcessosColumnName.contrato}`, '=', body.contrato);
    return queryNomeEmpresa;
}
exports.getConfiguracaoEmpresaPorContratoConfiguracao = getConfiguracaoEmpresaPorContratoConfiguracao;
function updateConfiguracaoPorContrato(body, conn) {
    const queryNomeEmpresa = conn
        .update(Object.assign({}, body)).from(`${enunsTableNames_1.TablesName.controleProcessos}`)
        .where(`${enuns_1.ControleProcessosColumnName.contrato}`, '=', body.contrato);
    return queryNomeEmpresa;
}
exports.updateConfiguracaoPorContrato = updateConfiguracaoPorContrato;
function getExiste(contrato, conn) {
    const queryNomeEmpresa = conn
        .select().from(`${enunsTableNames_1.TablesName.controleProcessos}`)
        .where(`${enuns_1.ControleProcessosColumnName.contrato}`, '=', contrato).limit(1);
    return queryNomeEmpresa;
}
exports.getExiste = getExiste;
function obterCodigo(nome) {
    const codigos = {
        MA000001: 'PARACATU',
        MA000003: 'UNAI',
        MA000004: 'BRASILIA',
        MA000005: 'BRASILANDIA DE MINAS',
        MA000006: 'JOÃO PINHEIRO',
        MA000008: 'ARAXA',
        MA000009: 'VAZANTE',
        MA000013: 'CRISTALINA',
        MA000028: 'TRÊS MARIAS',
        MA000031: 'MATRIZ'
    };
    for (let codigo in codigos) {
        if (codigos[codigo] === nome) {
            return codigo;
        }
    }
    return null;
}
exports.obterCodigo = obterCodigo;
//# sourceMappingURL=util.js.map