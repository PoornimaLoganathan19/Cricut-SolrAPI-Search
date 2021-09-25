import { Component, OnInit } from "@angular/core";
import { CartResponse } from "../shared/models/cartResponse";
import { OrderService } from "../shared/services/order.service";
import { mediaProperties } from "../shared/mediaProperties";
import { Router, NavigationEnd } from "@angular/router";
import { siteProperties } from "../shared/siteProperties";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
  orderResponse: CartResponse;
  mp: any;
  currency: string = siteProperties.currency;
  constructor(private orderService: OrderService, private router: Router) {
    router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (
          route.url != "/orders/" + localStorage.getItem("orderId") &&
          route.url != "/review"
        ) {
          localStorage.removeItem("orderId");
        }
      }
    });
  }

  ngOnInit() {
    this.mp = mediaProperties;
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrder().subscribe(data => {
      this.orderResponse = data;
      console.log(this.orderResponse);
      this.orderResponse.data.entries.forEach(entry => {
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
}
