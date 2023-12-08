export declare enum ControleAtualizacaoColumnName {
    id = "id",
    codigoVersao = "codigo_versao",
    contrato = "contrato",
    empresa = "empresa",
    codigoMaquina = "codregser",
    codigoUsuarioSuccess = "cd_usuario",
    nomeUsuarioSuccess = "nome_usuario",
    statusExecucao = "status_execucao",
    statusAtualizacao = "status_atualizacao",
    dataAtualizacao = "dt_atualizacao",
    dataAgendamento = "dt_agendada"
}
export declare enum ModconColumnName {
    contrato = "contrato",
    razaoSocial = "nomecli",
    cidade = "cidacli"
}
export declare enum Da37 {
    vendedor = "vendedor17"
}
export declare enum ControleProcessosColumnName {
    contrato = "contrato",
    razaoSocial = "nomecli",
    cidade = "cidacli",
    idControleProcessos = "id",
    baixar = "baixar",
    enviarErroLog = "enviar_erro_log",
    enviarConciliacao = "enviar_conciliacao",
    enviarRejeicaoFiscal = "enviar_rejeicao_fiscal",
    receberMensagem = "receber_msgs",
    enviarBoleto = "enviar_boletos",
    status = "status",
    cobranca = "cobranca",
    tipoAtualizacao = "tipo_atualizacao"
}
export declare enum ErrosLogColumn {
    id = "id",
    cod_versao = "cod_versao",
    contrato = "contrato",
    programa = "programa",
    data_exe = "dt_exe",
    desc_simplificada = "desc_simplificada",
    dados_erro = "dados_erro",
    empresa = "empresa",
    data_ocorrencia = "dt_ocorrencia",
    datlan = "datlan",
    titulo = "titulo"
}
export declare enum RejeicoesFiscaisColumn {
    id = "id",
    contrato = "contrato",
    codigo_rejeicao = "cod_rejeicao",
    descricao = "descricao",
    numero_documento = "num_documento",
    serie = "serie",
    data_exe = "dt_exe",
    data_ocorrencia = "dt_ocorrencia",
    tipodoc = "tipodoc",
    datlan = "datlan"
}
export declare enum PendenciasConciliacaoColumn {
    id = "id",
    contrato = "contrato",
    dataOcorrencia = "datdiv1"
}
export declare enum DatabaseName {
    name = "atualizacao_automatica"
}
