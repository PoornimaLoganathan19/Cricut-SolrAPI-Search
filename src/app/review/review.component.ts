import { Component, OnInit } from "@angular/core";
import { CartResponse } from "../shared/models/cartResponse";
import { CartService } from "../shared/services/cart.service";
import { OrderService } from "../shared/services/order.service";
import { Router } from "@angular/router";
import { mediaProperties } from "../shared/mediaProperties";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit {
  cartResponse: CartResponse;
  currency: string;
  mp: any;
  cardId: number;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mp = mediaProperties;
    this.getCart();
  }
  getCart() {
    this.cartService.getCart().subscribe(data => {
      this.cartResponse = data;
      console.log(this.cartResponse);
      this.currency = this.cartResponse.data.entries[0].product.price.currency;
      this.cardId = this.cartResponse.data.paymentInfos[0].creditCard.id;
    });
  }

  placeOrder() {
    this.orderService.placeOrder().subscribe(data => {
      this.cartResponse = data;
      console.log(this.cartResponse);
      localStorage.removeItem("cartNumber");
      localStorage.removeItem("addressId");
      localStorage.removeItem("cardId");
      localStorage.removeItem("fromReview");
      localStorage.removeItem("amount");
      document.getElementById("cartNumber").style.display = "none";
      localStorage.setItem("orderId", this.cartResponse.data.id);
      localStorage.setItem("showCart", "false");
      this.router.navigate(["confirm"]);
    });
  }

  changeAddress() {
    localStorage.setItem("fromReview", "true");
    this.router.navigate(["shipping"]);
  }

  changePayment() {
    localStorage.setItem(
      "amount",
      this.cartResponse.data.totalPriceWithTax.toString()
    );
    this.router.navigate(["payment"]);
  }
}
