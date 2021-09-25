import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../shared/services/product.service";
import { SolrProductsResponse } from "../shared/models/solrProductsResponse";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  searchText: string;
  searchResponse: SolrProductsResponse;
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    localStorage.removeItem("searchQueryOptions");
    document.getElementById("searchInput").focus();
  }
  search() {
    localStorage.setItem("searchText", this.searchText);
    this.productService.search(this.searchText).subscribe(data => {
      this.searchResponse = data;
      console.log(this.searchResponse);
      localStorage.setItem(
        "facetCounts",
        JSON.stringify(this.searchResponse.facet_counts)
      );
      this.router.navigate(["searchresult"]);
    });
  }

  goToCategory(subCategoryId: string) {
    localStorage.setItem("categoryId", subCategoryId);
    this.router.navigate(["categories", subCategoryId]);
  }
}
