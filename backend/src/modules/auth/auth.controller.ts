import { Controller, Post, Get, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { Public } from "../../common/decorators/public.decorator";
import { AuthService } from "./auth.service";

/**
 * AUTH-01 — POST /auth/login
 * AUTH-02 — POST /auth/register, /auth/email-verification/confirm, /auth/email-verification/resend
 * AUTH-03 — POST /auth/password-reset/request, /auth/password-reset/confirm
 */
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  logout() {
    return this.authService.logout();
  }

  @Get("me")
  getMe() {
    return this.authService.getMe();
  }

  @Public()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: unknown) {
    return this.authService.register(body);
  }

  @Public()
  @Post("email-verification/confirm")
  confirmEmail(@Body() body: { token: string }) {
    return this.authService.confirmEmail(body.token);
  }

  @Post("email-verification/resend")
  resendVerification() {
    return this.authService.resendVerification();
  }

  @Public()
  @Post("password-reset/request")
  @HttpCode(HttpStatus.OK)
  requestPasswordReset(@Body() body: { email: string }) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Public()
  @Post("password-reset/confirm")
  @HttpCode(HttpStatus.OK)
  confirmPasswordReset(@Body() body: { token: string; password: string }) {
    return this.authService.confirmPasswordReset(body.token, body.password);
  }
}
