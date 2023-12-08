import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioTDO } from 'src/tdo/usuarioDTO';
import { UserService } from 'src/user/user.service';
import { isAdm } from 'src/utils/util';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) { }

	login(user: UsuarioTDO): UserToken {
		//transforma o user em um JWT
		const payload: any = {
			sub: user.IdUsuario,
			email: user.usuario,
			name: user.nome
		};

		const jwtToken = this.jwtService.sign(payload);
		return {
			acess_token: jwtToken
		}
	}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findByUser(email);
		//const user = await this.userService.findDadosAdmByUser("adm@thislucasme");
		const userTe = await this.userService.findDadosAdmByUser(email);
		console.log(user)
		
		if (user) {
			//checar se a senha irformada corresponde a hash que está no banco
			const isPasswordValid = password === user.password;
			if (isPasswordValid) {
				return {
					...user
				}
			}
		}
		// Se chegar aqui, significa que não encontrou um user e/ou senha não corresponde
		throw new Error('Usuário ou senhas não correspondem');
	}

}
