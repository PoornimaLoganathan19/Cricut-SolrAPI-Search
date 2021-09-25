import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/shared/services/category.service";
import { Router, NavigationEnd } from "@angular/router";
import { mediaProperties } from "../shared/mediaProperties";
import { UserService } from "../shared/services/user.service";
import { CartService } from "../shared/services/cart.service";
import { CartResponse } from "../shared/models/cartResponse";
import { SimpleResponse } from "../shared/models/simpleResponse";
import { SolrCategoriesResponse } from "../shared/models/solrCategoriesResponse";
import { siteProperties } from "../shared/siteProperties";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  categoriesResponse: SolrCategoriesResponse;
  selectedCategoryId: string;
  selectedCategoryName: string;
  logoutResponse: SimpleResponse;
  cartResponse: CartResponse;
  mp: any;
  currency: string;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("userName")) {
      document.getElementById("loggedOut").style.display = "none";
      document.getElementById("loggedIn").style.display = "inherit";
      document.getElementById("userInitial").innerHTML = localStorage
        .getItem("userName")
        .substring(0, 1)
        .toUpperCase();
      document.getElementById("userFullName").innerHTML = localStorage.getItem(
        "userName"
      );
      this.getCart();
    } else {
      document.getElementById("loggedOut").style.display = "inherit";
      document.getElementById("loggedIn").style.display = "none";
      document.getElementById("cartNumber").style.display = "none";
    }
    this.mp = mediaProperties;
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categoriesResponse = data;
      this.currency = siteProperties.currency;
      this.categoriesResponse.response.docs.forEach(parent => {
        parent._childDocuments_.forEach(child => {
          child.url =
            this.mp.baseFolder +
            this.mp.categories +
            "/" +
            child.categoryId +
            this.mp.hero +
            "/1" +
            this.mp.extension;
        });
      });
      console.log(this.categoriesResponse);
      this.selectedCategoryId = this.categoriesResponse.response.docs[0].categoryId;
    });
  }

  getCart() {
    this.cartService.getCart().subscribe(data => {
      this.cartResponse = data;
      console.log(this.cartResponse);
      if (this.cartResponse.data) {
        document.getElementById("cartNumber").style.display = "block";
        document.getElementById(
          "cartNumber"
        ).innerHTML = this.cartResponse.data.totalItems.toString();
        localStorage.setItem("showCart", "true");
      } else {
        document.getElementById("cartNumber").style.display = "none";
        localStorage.setItem("showCart", "false");
      }
    });
  }

  onCategorySelected(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.selectedCategoryName = this.categoriesResponse.response.docs.find(
      category => category.categoryId == categoryId
    ).categoryName;
    console.log(this.selectedCategoryId);
  }

  goToCategory(categoryId: string) {
    localStorage.setItem("categoryId", categoryId);
    this.router.navigate(["categories", categoryId]);
  }

  showCart() {
    if (localStorage.getItem("userId")) {
      this.getCart();
      if (localStorage.getItem("showCart") == "true")
        this.router.navigate(["cart"]);
      else return;
    } else return;
  }

  signOut() {
    this.userService.logout().subscribe(data => {
      this.logoutResponse = data;
      console.log(this.logoutResponse);
      localStorage.clear();
      document.getElementById("loggedOut").style.display = "inherit";
      document.getElementById("loggedIn").style.display = "none";
      document.getElementById("cartNumber").style.display = "none";
      this.router.navigate([""]);
    });
  }
}
