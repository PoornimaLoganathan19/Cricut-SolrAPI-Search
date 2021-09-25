import { Component, OnInit } from "@angular/core";
import { SolrCategoryProducts } from "../shared/models/solrCategoryProducts";
import { CategoryService } from "../shared/services/category.service";
import { mediaProperties } from "../shared/mediaProperties";
import { Router, NavigationEnd } from "@angular/router";
import { CartService } from "../shared/services/cart.service";
import { CartResponse } from "../shared/models/cartResponse";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  categoryId: string;
  category: SolrCategoryProducts;
  mp: any;
  cartResponse: CartResponse;
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router
  ) {
    router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (route.url == "/categories/" + localStorage.getItem("categoryId"))
          this.getProducts();
      }
    });
  }

  ngOnInit() {
    this.mp = mediaProperties;
  }
  getProducts() {
    this.categoryService
      .getCategoryProducts(localStorage.getItem("categoryId"))
      .subscribe(data => {
        this.category = data.response.docs[0];
        console.log(this.category);
        this.category._childDocuments_.forEach(product => {
          product.url =
            this.mp.baseFolder +
            this.mp.products +
            "/" +
            product.productId +
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
