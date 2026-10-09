import { Module } from "@nestjs/common";
import { StaffController } from "./staff.controller";
import { StaffService } from "./staff.service";

/** ADM-USER-01/02 */
@Module({ controllers: [StaffController], providers: [StaffService] })
export class StaffModule {}
