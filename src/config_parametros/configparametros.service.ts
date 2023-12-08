import { BadRequestException, Injectable } from '@nestjs/common'
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service'
import { UsuarioBody } from 'src/tdo/usuarioDTO'
import { ConfigParamTDO } from './types'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ConfigParametrosService {
  constructor(private siteSuccess: SiteSuccessDatabaseService, private databaseService: DatabaseService) {}

  async getConfig(user: UsuarioBody) {
    const conn = await this.databaseService.getConnectionBanco();
    try {
      const result = await conn.raw(
        `select * from configuracao_parametro_logs limit 1`
      )
      return result[0]
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
  async setConfig(body: ConfigParamTDO, user: UsuarioBody) {
    const conn = await this.databaseService.getConnectionBanco()
    const config = await this.getConfig(user)
    const result = config[0]?.id_usuario ? true : false
    try {
      if (result) {
        return await conn.raw(
          `update configuracao_parametro_logs
          set id_usuario = '${user?.userId}',
          tempo_delete_registros_log = ${body.tempo_eliminacao_log},
          tempo_delete_pendencia_conciliacao = ${body.tempo_eliminacao_pendencia_concliliacao},
          tempo_delete_rejeicoes_fiscais = ${body.tempo_eliminacao_rejeicoes}`,    
        )
      } else {
        return await conn.raw(
          `insert into configuracao_parametro_logs values(1, '${user.userId}', ${body.tempo_eliminacao_log}, ${body.tempo_eliminacao_pendencia_concliliacao}, ${body.tempo_eliminacao_rejeicoes})`
        )
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
