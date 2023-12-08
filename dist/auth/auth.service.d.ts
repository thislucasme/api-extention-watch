import { JwtService } from '@nestjs/jwt';
import { UsuarioTDO } from 'src/tdo/usuarioDTO';
import { UserService } from 'src/user/user.service';
import { UserToken } from './models/UserToken';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: UsuarioTDO): UserToken;
    validateUser(email: string, password: string): Promise<any>;
}
