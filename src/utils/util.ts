import { Knex } from 'knex'
import * as moment from 'moment'
import { ControleProcessosColumnName, ModconColumnName } from 'src/enuns/enuns'
import { TablesName } from 'src/enuns/enunsTableNames'
import { ControleProcessosTDO, OptionData } from 'src/types/types'
moment().locale('pt-br')

export const gerarObjetosEntreDatas  = async (startDate: moment.Moment, endDate: moment.Moment)  => {
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
}



export const isAdm = (user: string): boolean => {
  const userSplited = user.split("@");
  if (userSplited.length > 1) {
    return true;
  }
  return false;
}
export const invertDate = (date: string) => {
  const texto = date.split('-').reverse().join('-');
  return texto;
}
export const getTipoString = (tipo: any): string => {
  switch (tipo) {
    case 1:
      return "Sim";
    case 2:
      return "Não";
    case null:
      return null;
    // adicionar mais cases para outros tipos, se necessário
    default:
      return "Tipo desconhecido";
  }
}



export function convertOptions(apiOptions: any[]): OptionData[] {
  return apiOptions.map((item: any) => ({
    label: item.originalname,
    value: item.filename
  }));
}
export function getEmpresaPorContrato(contrato: string, conn: Knex<any, unknown[]>) {
  const queryNomeEmpresa = conn
    .select(
      `${ModconColumnName.contrato}`,
      `${ModconColumnName.razaoSocial} as razao_social`
    ).from(`${TablesName.modcon}`)
    .where(`${ModconColumnName.contrato}`, '=', contrato)
  return queryNomeEmpresa
}
export function getEmpresaPorContratoConfiguracao(contrato: string, conn: Knex<any, unknown[]>) {
  const queryNomeEmpresa = conn
    .select(
      `A.${ModconColumnName.contrato}`,
      `A.${ModconColumnName.razaoSocial} as razao_social`,
      `B.${ControleProcessosColumnName.baixar}`,
      `B.${ControleProcessosColumnName.enviarRejeicaoFiscal}`,
      `B.${ControleProcessosColumnName.receberMensagem}`,
      `B.${ControleProcessosColumnName.enviarBoleto}`,
      `B.${ControleProcessosColumnName.cobranca}`,
      `B.${ControleProcessosColumnName.enviarErroLog}`,
      `B.${ControleProcessosColumnName.enviarConciliacao}`
    ).from(`${TablesName.modcon} as A`)
    .join('controle_processos as B', 'B.contrato', 'A.contrato')
    .where(`A.${ModconColumnName.contrato}`, '=', contrato)
  return queryNomeEmpresa
}
export function getConfiguracaoEmpresaPorContratoConfiguracao(body: ControleProcessosTDO, conn: Knex<any, unknown[]>) {
  
  const queryNomeEmpresa = conn
    .insert(
   { ...body }
    ).from(`${TablesName.controleProcessos}`)
    .where(`${ControleProcessosColumnName.contrato}`, '=', body.contrato)

  return queryNomeEmpresa
}
export function updateConfiguracaoPorContrato(body: ControleProcessosTDO, conn: Knex<any, unknown[]>) {
  
  const queryNomeEmpresa = conn
    .update(
   { ...body }
    ).from(`${TablesName.controleProcessos}`)
    .where(`${ControleProcessosColumnName.contrato}`, '=', body.contrato)

  return queryNomeEmpresa
}
export function getExiste(contrato: string, conn: Knex<any, unknown[]>) {
  
  const queryNomeEmpresa = conn
    .select(
    ).from(`${TablesName.controleProcessos}`)
    .where(`${ControleProcessosColumnName.contrato}`, '=', contrato).limit(1)

  return queryNomeEmpresa
}
export function obterCodigo(nome) {
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
