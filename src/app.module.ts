import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuracao from './config/configuracao';
import { ConfiguracaoBancoModule } from './config_banco/configuracao-banco.module';
import { ConfigParametrosModule } from './config_parametros/configparametros.module';
import { ConfigParametrosService } from './config_parametros/configparametros.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { SiteSuccessDatabaseService } from './database/site-success-database.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Define o diretório de destino para salvar os arquivos
    }),
    ConfiguracaoBancoModule,
    ConfigParametrosModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true,
    }),
  ],
  controllers: [ AppController],
  providers: [
    ConfigParametrosService,
    SiteSuccessDatabaseService,
    AppService,
    DatabaseService,
    
  ],
})
export class AppModule { }
