import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { SolrCategoriesResponse } from "../models/solrCategoriesResponse";
import { SolrCategoryProductsResponse } from "../models/solrCategoryProductsResponse";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private solrApiUrl = environment.solrApiUrl;
  private categoriesSearchUrl = environment.categoriesSearchUrl;
  private categoryProductsSearchUrl = environment.categoryProductsSearchUrl;
  private selectUrl = environment.selectUrl;
  private searchReturnType = environment.searchReturnType;
  private categoryFilterQuery = environment.categoryFilterQuery;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<SolrCategoriesResponse> {
    const url =
      this.solrApiUrl +
      this.categoriesSearchUrl +
      this.selectUrl +
      "*" +
      this.categoryFilterQuery +
      this.searchReturnType;
    return this.http.get<SolrCategoriesResponse>(url);
  }

  getCategoryProducts(
    searchText: string
  ): Observable<SolrCategoryProductsResponse> {
    const url =
      this.solrApiUrl +
      this.categoryProductsSearchUrl +
      this.selectUrl +
      searchText +
      this.categoryFilterQuery +
      this.searchReturnType;
    return this.http.get<SolrCategoryProductsResponse>(url);
  }
}
