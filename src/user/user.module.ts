import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
    imports: [SiteSuccessDatabaseService, DatabaseService],
    controllers: [UserController,],
    providers: [UserService, SiteSuccessDatabaseService, DatabaseService],
    exports: [UserService, UserModule]
})
export class UserModule { }
