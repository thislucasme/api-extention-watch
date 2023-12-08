import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/utils/currentUser'
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service'
import { UsuarioBody } from 'src/tdo/usuarioDTO'
import { ConfigParametrosService } from './configparametros.service'
import { ConfigParamTDO } from './types'
import { UserPayload } from 'src/auth/models/UserPayload'

@Controller('config-parametros')
export class ConfigParametrosController {
  constructor(private configurarParametros: ConfigParametrosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  configurar(@Body() body: ConfigParamTDO, @CurrentUser() user: UsuarioBody) {
    this.configurarParametros.setConfig(body, user)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  get(@CurrentUser() user: UsuarioBody) {
    const usuario: any = user;
    if(usuario.matriz !== 'MATRIZ'){
      throw new UnauthorizedException("Usuário não autorizado")
    }
    return this.configurarParametros.getConfig(user)
  }
}
