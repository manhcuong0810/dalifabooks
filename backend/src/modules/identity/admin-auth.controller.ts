import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { Public } from "../../common/decorators/public.decorator";
import { AdminAuthService } from "./admin-auth.service";

/**
 * AUTH-04 — CMS login & MFA
 * POST /admin/auth/login → pre-auth challenge
 * POST /admin/auth/mfa/verify → verify TOTP → CMS session
 * POST /admin/auth/mfa/setup / confirm
 * POST /admin/auth/logout
 */
@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly service: AdminAuthService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { email: string; password: string }) {
    return this.service.login(body.email, body.password);
  }

  @Public()
  @Post("mfa/verify")
  @HttpCode(HttpStatus.OK)
  verifyMfa(@Body() body: { challengeToken: string; code: string }) {
    return this.service.verifyMfa(body.challengeToken, body.code);
  }

  @Post("mfa/setup")
  setupMfa() {
    return this.service.setupMfa();
  }

  @Post("mfa/confirm")
  confirmMfaSetup(@Body() body: { code: string }) {
    return this.service.confirmMfaSetup(body.code);
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  logout() {
    return this.service.logout();
  }
}
