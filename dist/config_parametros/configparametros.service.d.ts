import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { ConfigParamTDO } from './types';
import { DatabaseService } from 'src/database/database.service';
export declare class ConfigParametrosService {
    private siteSuccess;
    private databaseService;
    constructor(siteSuccess: SiteSuccessDatabaseService, databaseService: DatabaseService);
    getConfig(user: UsuarioBody): Promise<any>;
    setConfig(body: ConfigParamTDO, user: UsuarioBody): Promise<any>;
}
