import { ConfiguracaoBancoModule } from './../config_banco/configuracao-banco.module';
import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { SiteSuccessDatabaseService } from './site-success-database.service';
@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService, SiteSuccessDatabaseService],
  exports: [DatabaseService, SiteSuccessDatabaseService]
})
export class DatabaseModule { }
