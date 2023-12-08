import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { readFile, writeFile } from 'fs'
import knexFn, { Knex } from 'knex'
import { ConfiguracaoTDO, ConfiguracaoTDOBanco } from 'src/types/types'
import { getOrCreateKnexInstance, getOrCreateKnexInstanceDatabase } from './knexCache'

@Injectable()
export class DatabaseService {
  private knex: Knex
  private registroRestaurado: any
  constructor(configService: ConfigService) {
    const host = configService.get('atualizacaoAutomatica.host')
    if (!host)
      throw new Error(
        'VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_HOST NÃO CONFIGURADA!'
      )
    const port = configService.get('atualizacaoAutomatica.port')
    if (!port)
      throw new Error(
        'VARIAVEL DE AMBIENTE ATUALIZACAO_DB_PORT NÃO CONFIGURADA!'
      )
    const user = configService.get('atualizacaoAutomatica.user')
    if (!user)
      throw new Error(
        'VARIAVEL DE AMBIENTE ATUALIZACAO_DB_USER NÃO CONFIGURADA!'
      )
    const password = configService.get('atualizacaoAutomatica.password')
    if (!password)
      throw new Error(
        'VARIAVEL DE AMBIENTE ATUALIZACAO_DB_PASS NÃO CONFIGURADA!'
      )
    const database = configService.get('atualizacaoAutomatica.name')
    if (!database)
      throw new Error(
        'VARIAVEL DE AMBIENTE ATUALIZACAO_DB_NAME NÃO CONFIGURADA!'
      )

    this.registroRestaurado = {
      servidor: host,
      banco: database,
      usuario: user,
      senha: password,
      porta: port,
      servidorHex: host,
      bcohex: database,
    }


  }
  async getConnection() {
    const result = await this.getConfiguracao();
    const isVazio = result.length ? true : false;
    if (!isVazio) throw new HttpException('Configuração está vazia', HttpStatus.NO_CONTENT);
    const dadosConfiguracao: ConfiguracaoTDOBanco = result[0];
    const dadosServer = {
      servidor: dadosConfiguracao?.host,
      banco: dadosConfiguracao?.banco,
      usuario: dadosConfiguracao?.usuario,
      senha: dadosConfiguracao?.senha,
      porta: dadosConfiguracao?.port,
      servidorHex: dadosConfiguracao?.host,
      bcohex: dadosConfiguracao?.banco,
    }
  

    const conn = await getOrCreateKnexInstanceDatabase(dadosServer)
    return conn
  }
  async getConnectionBanco() {
    const conn = await getOrCreateKnexInstance(this.registroRestaurado)
    return conn
  }
  async getConfiguracao() {
    const conn = await this.getConnectionBanco()
    const query = this.findConfiguracao(conn);
    try {
      return await query;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ocorreu um erro no servidor');
    }
  }
  findConfiguracao(conn: Knex<any, unknown[]>) {
    return conn.select().from('configuracao_banco_dados').limit(1)
  }
  async salvarConfiguracao(dados: ConfiguracaoTDOBanco, userName: string) {
    const conn = await this.getConnectionBanco()
    const queryFindConfiguracao = this.findConfiguracao(conn);
    if ((await queryFindConfiguracao).length > 0) {
      const query = this.updateConfiguracaoBanco(conn, dados, userName);
      return await query;
    }
    const query = this.salvarConfiguracaoBanco(conn, dados, userName);
    return await query;
  }
  salvarConfiguracaoBanco(conn: Knex<any, unknown[]>, dados: ConfiguracaoTDOBanco, userName: string) {
    try {
      return conn.raw(
        `insert into configuracao_banco_dados
        values(1, '${dados?.host}', '${dados?.port}',
        '${dados?.senha}', '${userName}', '${dados?.usuario}', '${dados?.banco}')`);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ocorreu um erro no servidor');
    }
  }
  updateConfiguracaoBanco(conn: Knex<any, unknown[]>, dados: ConfiguracaoTDOBanco, userName: string) {
    try {
      return conn.raw(
        `UPDATE configuracao_banco_dados SET 
        host = '${dados?.host}', port = '${dados?.port}',
        senha = '${dados?.senha}',
        created_by = '${userName}',
        usuario = '${dados?.usuario}',
        banco = '${dados?.banco}'
        WHERE (id = '1');

    `);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ocorreu um erro no servidor');
    }
  }
  async readEnv() {
    readFile(".env", "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return;
      } else {
        //console.log(jsonString)
      }
    });

    // Data which will write in a file.
    let data = [];
    const conn = await this.getConnectionBanco()
    const query = this.findConfiguracao(conn);
    let configuracao: ConfiguracaoTDOBanco;
    try {
      const result = await query;
      configuracao = result[0]
      data.push("chave_autentication=6567856lj\n");
      data.push("# Chave de criptografia usada no Success\n");
      data.push("CHAVE_CRIPTO=Success2021\n");
      data.push("\n")
      data.push("ATUALIZACAO_DB_HOST=success.vps-kinghost.net\n");
      data.push("ATUALIZACAO_DB_USER=root\n");
      data.push("ATUALIZACAO_DB_PASS=success123\n");
      data.push("ATUALIZACAO_DB_DATABASE=atualizacao_automatica\n");
      data.push("ATUALIZACAO_DB_PORT=3309\n");
      data.push('\n')
      data.push('# Banco de dados do site da Success, de onde é puxado os registros de conexões\n')
      data.push('# do sincronismo dos clientes (tabela cfgw)\n')
      data.push(`SITE_SUCCESS_DB_HOST=${configuracao?.host}\n`)
      data.push(`SITE_SUCCESS_DB_NAME=successtestes01\n`)
      data.push(`SITE_SUCCESS_DB_USER=${configuracao?.usuario}\n`)
      data.push(`SITE_SUCCESS_DB_PASSWORD=${configuracao?.senha}\n`)
      data.push(`SITE_SUCCESS_DB_PORT=${configuracao?.port}\n`)
      // Write data in 'Output.txt' .
      writeFile('.env', data.join(""), (err) => {

        // In case of a error throw err.
        if (err) throw err;
      })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ocorreu um erro no servidor');
    }
  }
}
