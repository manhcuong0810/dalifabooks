import { SetMetadata } from "@nestjs/common";
import { PERMISSIONS_KEY } from "../guards/permissions.guard";

/** @RequirePermissions('catalog.write', 'catalog.publish') */
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
