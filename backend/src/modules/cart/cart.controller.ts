import { Controller, Get, Put, Delete, Param, Body } from "@nestjs/common";
import { CartService } from "./cart.service";

/**
 * CART-01
 * GET    /cart
 * PUT    /cart/items/:editionId  — đặt số lượng tuyệt đối (retry-safe)
 * DELETE /cart/items/:editionId
 */
@Controller("cart")
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get()
  getCart() { return this.service.getCart(); }

  @Put("items/:editionId")
  upsertItem(
    @Param("editionId") editionId: string,
    @Body() body: { quantity: number }
  ) {
    return this.service.upsertItem(editionId, body.quantity);
  }

  @Delete("items/:editionId")
  removeItem(@Param("editionId") editionId: string) {
    return this.service.removeItem(editionId);
  }
}
