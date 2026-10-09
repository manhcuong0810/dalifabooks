import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "../guards/jwt-auth.guard";

/** Đánh dấu route không cần xác thực */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
