import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthService } from "./admin-auth.service";

/** AUTH-04 — CMS login + MFA */
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET ?? "dalifabooks-dev-secret",
        signOptions: {
          issuer: "dalifabooks",
          audience: "admin",
          expiresIn: "8h",
        },
      }),
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  exports: [AdminAuthService],
})
export class IdentityModule {}
