import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CartResponse } from "../models/cartResponse";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private apiUrl: string = environment.apiUrl;
  private cartUrl: string = environment.cartUrl;
  private placeOrderUrl: string = environment.placeOrderUrl;
  private orderUrl: string = environment.orderUrl;
  constructor(private http: HttpClient) {}
  placeOrder(): Observable<CartResponse> {
    let url = this.apiUrl + this.cartUrl + this.placeOrderUrl;
    return this.http.post<CartResponse>(url, null);
  }
  getOrder(): Observable<CartResponse> {
    let url =
      this.apiUrl + this.orderUrl + "/" + localStorage.getItem("orderId");
    return this.http.get<CartResponse>(url);
  }
}
