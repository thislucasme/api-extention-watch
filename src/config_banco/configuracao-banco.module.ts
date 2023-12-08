import { DatabaseService } from './../database/database.service';
import { ConfiguracaoBancoController } from './configuracao-banco.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ConfiguracaoBancoController],
})
export class ConfiguracaoBancoModule { }
