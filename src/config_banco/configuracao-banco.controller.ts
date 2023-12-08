import { query } from 'express';
import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { ConfiguracaoTDO, ConfiguracaoTDOBanco } from 'src/types/types';
@Controller('configuracao-db')
export class ConfiguracaoBancoController {
    constructor( private databaseService:DatabaseService) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    async getConfig() {
        const result =  await this.databaseService.getConfiguracao();
        const isVazio = result.length ? true : false;
        if(!isVazio) throw new HttpException('', HttpStatus.NO_CONTENT);
        return result[0]; 
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async salvarConfiguracao(@Body() dados: ConfiguracaoTDOBanco, @CurrentUser() user: UsuarioBody) {
        const result = await this.databaseService.salvarConfiguracao(dados, user?.username);
       if(result[0]?.affectedRows > 0) throw new HttpException('Dados salvos com sucesso!', HttpStatus.CREATED)
       throw new HttpException('Ocorreu um erro no servidor!', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    @Get('teste')
   async teste(){
        const result = await this.databaseService.getConnection();
        const query = result.select().from('usuarios')
        //result?.destroy();
        return await query;
        //return this.databaseService.readEnv();
    }
}
