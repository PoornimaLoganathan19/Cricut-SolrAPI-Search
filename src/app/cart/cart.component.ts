import { Component, OnInit } from "@angular/core";
import { CartResponse } from "../shared/models/cartResponse";
import { CartService } from "../shared/services/cart.service";
import { mediaProperties } from "../shared/mediaProperties";
import { Router, NavigationEnd } from "@angular/router";
import { siteProperties } from "../shared/siteProperties";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  cartResponse: CartResponse;
  mp: any;
  currency: string = siteProperties.currency;
  showCheckoutButton: boolean;
  constructor(private cartService: CartService, private router: Router) {
    router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (route.url == "/cart") {
          this.showCheckoutButton = true;
        }
      }
    });
  }

  ngOnInit() {
    this.mp = mediaProperties;
    this.currency = "USD";
    this.getCart();
  }
  getCart() {
    this.cartService.getCart().subscribe(data => {
      this.cartResponse = data;
      console.log(this.cartResponse);
      this.cartResponse.data.entries.forEach(entry => {
        entry.product.url =
          this.mp.baseFolder +
          this.mp.products +
          "/" +
          entry.product.productId +
          this.mp.hero +
          "/1" +
          this.mp.extension;
      });
    });
  }
  goToProduct(productId: string) {
    localStorage.setItem("productId", productId);
    this.router.navigate(["products", productId]);
  }

  goToCheckout() {
    localStorage.setItem(
      "amount",
      this.cartResponse.data.totalPriceWithTax.toString()
    );
    if (
      this.cartResponse.data.shippingAddress &&
      this.cartResponse.data.paymentInfos
    )
      this.router.navigate(["review"]);
    else {
      if (this.cartResponse.data.shippingAddress)
        this.router.navigate(["/payment"]);
      else this.router.navigate(["/shipping"]);
    }
  }

  showCategoriesPopup() {
    document.getElementById("categoriesPopup").click();
  }
}
