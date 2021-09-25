import { Component, OnInit } from "@angular/core";
import { Product } from "../shared/models/product";
import { OrderService } from "../shared/services/order.service";
import { mediaProperties } from "../shared/mediaProperties";
import { CartResponse } from "../shared/models/cartResponse";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"]
})
export class ConfirmComponent implements OnInit {
  orderResponse: CartResponse;
  product: Product;
  mp: any;
  currency: string;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.mp = mediaProperties;
    this.getOrder();
    const confetti = require("canvas-confetti");
    const myCanvas = document.getElementById("custom-canvas");
    document.getElementById("confit").appendChild(myCanvas);
    const myConfetti = confetti.create(myCanvas, { resize: true });
    const end = Date.now() + 5 * 1000;

    const interval = setInterval(function() {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      myConfetti({
        startVelocity: 50,
        spread: 360,
        ticks: 80,
        shapes: ["square", "circle"],
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.3
        }
      });
    }, 200);
  }
  showAllProducts() {
    console.log("test");
    document.getElementById("categoriesPopup").click();
  }

  getOrder() {
    this.orderService.getOrder().subscribe(data => {
      this.orderResponse = data;
      this.currency = this.orderResponse.data.entries[0].product.price.currency;
      console.log(this.orderResponse);
    });
  }
}
