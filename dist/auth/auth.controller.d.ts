import { AuthService } from './auth.service';
import { AuthRequest } from './models/AuthRequest';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: AuthRequest): import("./models/UserToken").UserToken;
    loginAdm(req: AuthRequest): import("./models/UserToken").UserToken;
    getUsuario(body: any): Promise<any>;
    teste(current: any): {
        usuario: any;
        praca: any;
    };
}
