import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { ConfiguracaoTDOBanco } from 'src/types/types';
export declare class ConfiguracaoBancoController {
    private databaseService;
    constructor(databaseService: DatabaseService);
    getConfig(): Promise<any>;
    salvarConfiguracao(dados: ConfiguracaoTDOBanco, user: UsuarioBody): Promise<void>;
    teste(): Promise<any[]>;
}
