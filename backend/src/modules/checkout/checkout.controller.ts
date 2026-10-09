import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { Public } from "../../common/decorators/public.decorator";
import { CheckoutService } from "./checkout.service";

@Controller()
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  /** CHECKOUT-01 — POST /checkout/quote */
  @Public()
  @Post("checkout/quote")
  createQuote(@Body() body: unknown) {
    return this.service.createQuote(body);
  }

  /** CHECKOUT-01 — POST /orders */
  @Public()
  @Post("orders")
  createOrder(@Body() body: unknown) {
    return this.service.createOrder(body);
  }

  /** CHECKOUT-02 — GET /orders/:id/confirmation */
  @Public()
  @Get("orders/:id/confirmation")
  getConfirmation(@Param("id") id: string) {
    return this.service.getConfirmation(id);
  }

  /** CHECKOUT-02 — POST /orders/:id/payment-review-requests */
  @Public()
  @Post("orders/:id/payment-review-requests")
  requestPaymentReview(@Param("id") id: string, @Body() body: unknown) {
    return this.service.requestPaymentReview(id, body);
  }
}
