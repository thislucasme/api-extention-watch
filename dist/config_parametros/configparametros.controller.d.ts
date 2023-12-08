import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { ConfigParametrosService } from './configparametros.service';
import { ConfigParamTDO } from './types';
export declare class ConfigParametrosController {
    private configurarParametros;
    constructor(configurarParametros: ConfigParametrosService);
    configurar(body: ConfigParamTDO, user: UsuarioBody): void;
    get(user: UsuarioBody): Promise<any>;
}
