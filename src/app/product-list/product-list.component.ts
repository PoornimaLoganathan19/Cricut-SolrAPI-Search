import { Component, OnInit } from "@angular/core";
import { ProductService } from "../shared/services/product.service";
import { Router } from "@angular/router";
import { mediaProperties } from "../shared/mediaProperties";
import { SolrProduct } from "../shared/models/solrProduct";
import { SolrProductsResponse } from "../shared/models/solrProductsResponse";
import { CartService } from "../shared/services/cart.service";
import { CartResponse } from "../shared/models/cartResponse";
import { siteProperties } from "../shared/siteProperties";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  topProductsResponse: SolrProductsResponse;
  topProducts: SolrProduct[];
  mp: any;
  currency: string;
  cartResponse: CartResponse;
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.currency = siteProperties.currency;
    this.mp = mediaProperties;
    this.getTopProducts();
  }

  getTopProducts() {
    this.productService.search("*:*").subscribe(data => {
      this.topProductsResponse = data;
      this.topProducts = this.topProductsResponse.response.docs.slice(0, 6);
      this.topProducts.forEach(model => {
        model.url =
          this.mp.baseFolder +
          this.mp.products +
          "/" +
          model.productId +
          this.mp.hero +
          "/1" +
          this.mp.extension;
      });
      console.log(this.topProductsResponse);
    });
  }

  goToProduct(productId: string) {
    localStorage.setItem("productId", productId);
    this.router.navigate(["products", productId]);
  }

  addToCart(productId: string) {
    if (localStorage.getItem("userId")) {
      this.cartService.addToCart(productId, 1).subscribe(data => {
        this.cartResponse = data;
        console.log(this.cartResponse);
        document.getElementById("cartNumber").style.display = "block";
        document.getElementById(
          "cartNumber"
        ).innerHTML = this.cartResponse.data.totalItems.toString();
        this.router.navigate(["cart"]);
      });
    } else {
      localStorage.setItem("afterAddToCart", "true");
      localStorage.setItem("productId", productId);
      localStorage.setItem("quantity", "1");
      this.router.navigate(["login"]);
    }
  }
}
