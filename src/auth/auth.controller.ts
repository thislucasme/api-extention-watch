import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './utils/currentUser';
import { UserPayload } from './models/UserPayload';

@Controller()
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@Post("login")
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	login(@Request() req: AuthRequest) {
		return this.authService.login(req.user);
	}
	@Post("login-adm")
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	loginAdm(@Request() req: AuthRequest) {
		return this.authService.login(req.user);
	}
	@Post('details')
	getUsuario(@Body() body: any){
		return this.authService.validateUser(body?.email, body?.password);
	}

	@UseGuards(JwtAuthGuard)
	@Get('user')
	teste(@CurrentUser() current: any) {
		return {usuario: current?.username, praca: current?.matriz}
	}
}
