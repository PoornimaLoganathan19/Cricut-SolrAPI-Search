import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductResponse } from "../models/productResponse";
import { SolrProductsResponse } from "../models/solrProductsResponse";
import { SearchQueryOptions } from "../models/searchQueryOptions";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private SOLR_API_URL: string = environment.solrApiUrl;
  private productsSearchUrl: string = environment.productsSearchUrl;
  private selectUrl: string = environment.selectUrl;
  private searchReturnType: string = environment.searchReturnType;
  private priceSort: string = environment.priceSort;
  private facetUrl: string = environment.facetUrl;
  private apiUrl: string = environment.apiUrl;
  private productUrl: string = environment.productUrl;
  private keyValueUrl: string = environment.keyValueUrl;
  private entityTypeQuery: string = environment.entityTypeQuery;
  private specTypeQuery: string = environment.specTypeQuery;
  private searchText: string;
  private categoryId: string;
  private colors: string;
  private priceValue: string;
  private start: number;
  constructor(private http: HttpClient) {}

  getProduct(): Observable<ProductResponse> {
    const url =
      this.apiUrl + this.productUrl + "/" + localStorage.getItem("productId");
    return this.http.get<ProductResponse>(url);
  }

  getProductSpecifications(): Observable<ProductResponse> {
    const url =
      this.apiUrl +
      this.productUrl +
      "/" +
      localStorage.getItem("productId") +
      this.keyValueUrl +
      "?" +
      this.specTypeQuery +
      "SPECIFICATIONS" +
      "&" +
      this.entityTypeQuery +
      "product";
    return this.http.get<ProductResponse>(url);
  }
  search(searchText: string): Observable<SolrProductsResponse> {
    const url =
      this.SOLR_API_URL +
      this.productsSearchUrl +
      this.selectUrl +
      searchText +
      this.priceSort +
      this.facetUrl +
      this.searchReturnType;
    return this.http.get<SolrProductsResponse>(url);
  }
  searchWithFacets(
    searchQueryOptions: SearchQueryOptions
  ): Observable<SolrProductsResponse> {
    this.colors = "";
    if (searchQueryOptions.searchText != null)
      this.searchText = searchQueryOptions.searchText;
    else this.searchText = "*";
    if (searchQueryOptions.categoryId != null)
      this.categoryId = searchQueryOptions.categoryId;
    else this.categoryId = "*";
    if (searchQueryOptions.start != null) this.start = searchQueryOptions.start;
    else this.start = 0;
    if (
      searchQueryOptions.colors != null &&
      searchQueryOptions.colors.length > 0
    ) {
      searchQueryOptions.colors.forEach(
        color => (this.colors += color + " OR ")
      );
      this.colors = this.colors.substring(0, this.colors.lastIndexOf(" OR "));
    } else this.colors = "*";
    if (
      searchQueryOptions.minPrice != null &&
      searchQueryOptions.maxPrice != null
    )
      this.priceValue =
        "[" +
        searchQueryOptions.minPrice +
        " TO " +
        searchQueryOptions.maxPrice +
        "]";
    else this.priceValue = "*";
    const url =
      this.SOLR_API_URL +
      this.productsSearchUrl +
      this.selectUrl +
      this.searchText +
      " AND categoryId:" +
      this.categoryId +
      " AND (color:" +
      this.colors +
      ") AND priceValue:" +
      this.priceValue +
      this.priceSort +
      this.facetUrl +
      "&start=" +
      this.start +
      this.searchReturnType;
    return this.http.get<SolrProductsResponse>(url);
  }
}
