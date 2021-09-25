import { Component, OnInit, ViewChildren } from "@angular/core";
import { ProductService } from "../shared/services/product.service";
import { Router } from "@angular/router";
import { mediaProperties } from "../shared/mediaProperties";
import { SolrProductsResponse } from "../shared/models/solrProductsResponse";
import { CollapseComponent } from "angular-bootstrap-md";

import { Options, LabelType } from "ng5-slider";
import { FilterOption } from "../shared/models/filterOption";
import { FacetCounts } from "../shared/models/facetCounts";
import { FacetFields } from "../shared/models/FacetFields";
import { SearchQueryOptions } from "../shared/models/searchQueryOptions";
import { CartService } from "../shared/services/cart.service";
import { CartResponse } from "../shared/models/cartResponse";
import { siteProperties } from "../shared/siteProperties";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"]
})
export class SearchResultComponent implements OnInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  searchResponse: SolrProductsResponse;
  searchKey: string;
  mp: any;
  currency: string;
  priceOptions: Options = {
    floor: 0,
    ceil: 500,
    step: 50,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "$" + value;
        case LabelType.High:
          return "$" + value;
        default:
          return "$" + value;
      }
    }
  };
  colors: FilterOption[];
  pages: number[];
  currentPage: number;
  start: number;
  startNumber: number;
  endNumber: number;
  searchQueryOptions: SearchQueryOptions;
  facetCounts: FacetCounts;
  facetFields: FacetFields;
  cartResponse: CartResponse;
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.mp = mediaProperties;
    this.currency = siteProperties.currency;
    this.facetCounts = JSON.parse(localStorage.getItem("facetCounts"));
    this.facetFields = this.facetCounts.facet_fields;
    this.colors = [];
    for (var i = 0; i < this.facetFields.color.length; i = i + 2) {
      this.colors.push({
        name: this.facetFields.color[i],
        isSelected: false
      });
    }
    if (localStorage.getItem("searchQueryOptions")) {
      this.searchQueryOptions = JSON.parse(
        localStorage.getItem("searchQueryOptions")
      );
      this.searchQueryOptions.colors.forEach(selectedColor => {
        this.colors.find(
          color => color.name == selectedColor
        ).isSelected = true;
      });
    } else {
      this.searchQueryOptions = new SearchQueryOptions();
      this.searchQueryOptions.colors = [];
      this.searchQueryOptions.minPrice = 0;
      this.searchQueryOptions.maxPrice = 400;
    }
    this.searchQueryOptions.searchText = localStorage.getItem("searchText");
    this.pages = [];
    if (localStorage.getItem("page"))
      this.currentPage = Number(localStorage.getItem("page"));
    else this.currentPage = 1;
    this.searchQueryOptions.start = (this.currentPage - 1) * 10;
    this.searchWithFacets();
  }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        collapse.toggle();
      });
    });
  }

  onColorSelected(colorName: string) {
    this.colors.find(
      color => color.name == colorName
    ).isSelected = !this.colors.find(color => color.name == colorName)
      .isSelected;
    this.searchQueryOptions.colors = [];
    this.colors.forEach(color => {
      if (color.isSelected) this.searchQueryOptions.colors.push(color.name);
    });
    this.onPageChange(1);
  }

  onPriceChange() {
    this.onPageChange(1);
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.pages.length) return;
    this.searchQueryOptions.start = (page - 1) * 10;
    this.currentPage = page;
    localStorage.setItem("page", page.toString());
    window.scroll(0, 0);
    this.searchWithFacets();
  }

  searchWithFacets() {
    if (!this.searchQueryOptions.searchText) return;
    localStorage.setItem("searchText", this.searchQueryOptions.searchText);
    this.productService
      .searchWithFacets(this.searchQueryOptions)
      .subscribe(data => {
        this.searchResponse = data;
        this.pages = [];
        if (this.searchResponse.response.docs.length == 0) this.pages = [1];
        else {
          for (
            var i = 1;
            i <= Math.ceil(this.searchResponse.response.numFound / 10);
            i++
          ) {
            this.pages[i - 1] = i;
          }
        }
        this.startNumber = this.searchResponse.response.start + 1;
        this.endNumber =
          this.searchResponse.response.start +
          this.searchResponse.response.docs.length;
        this.searchResponse.response.docs.forEach(product => {
          product.url =
            this.mp.baseFolder +
            this.mp.products +
            "/" +
            product.productId +
            this.mp.hero +
            "/1" +
            this.mp.extension;
        });
        console.log(this.searchResponse);
        localStorage.setItem(
          "searchQueryOptions",
          JSON.stringify(this.searchQueryOptions)
        );
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
  reset() {
    this.colors.forEach(color => (color.isSelected = false));
    this.searchQueryOptions = new SearchQueryOptions();
    this.searchQueryOptions.searchText = localStorage.getItem("searchText");
    this.searchQueryOptions.colors = [];
    this.searchQueryOptions.minPrice = 0;
    this.searchQueryOptions.maxPrice = 400;
    this.onPageChange(1);
    this.searchWithFacets();
  }
}
