import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CartResponse } from "../models/cartResponse";
import { HttpClient } from "@angular/common/http";
import { SimpleResponse } from "../models/simpleResponse";
import { DeliveryModesResponse } from "../models/deliveryModesResponse";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private apiUrl: string = environment.apiUrl;
  private cartUrl: string = environment.cartUrl;
  private addToCartUrl: string = environment.addToCartUrl;
  private currentCartUrl: string = environment.currentCartUrl;
  private checkoutUrl: string = environment.checkoutUrl;
  private shippingUrl: string = environment.shippingUrl;
  private paymentUrl: string = environment.paymentUrl;
  private deliveryModesUrl: string = environment.deliveryModesUrl;
  constructor(private http: HttpClient) {}
  addToCart(productId: String, quantity: number): Observable<CartResponse> {
    let body = { productId, quantity };
    let url = this.apiUrl + this.cartUrl + this.addToCartUrl;
    return this.http.post<CartResponse>(url, body);
  }
  getCart(): Observable<CartResponse> {
    let url = this.apiUrl + this.cartUrl + this.currentCartUrl;
    return this.http.get<CartResponse>(url);
  }

  addAddressToCart(
    shippingAddressId: number,
    deliveryModeId: number
  ): Observable<SimpleResponse> {
    let body = {
      shippingAddressId,
      requestedDeliveryDate: "2018-07-29",
      defaultDeliveryDate: "2018-10-19",
      deliveryModeId
    };
    let url = this.apiUrl + this.cartUrl + this.checkoutUrl + this.shippingUrl;
    return this.http.put<SimpleResponse>(url, body);
  }
  addPaymentToCart(creditCardid: number, amount: number) {
    let body = { paymentType: "CREDITCARD", creditCardid, amount, status: 1 };
    let url = this.apiUrl + this.cartUrl + this.checkoutUrl + this.paymentUrl;
    return this.http.put<SimpleResponse>(url, body);
  }
  getDeliveryModes(): Observable<DeliveryModesResponse> {
    let url = this.apiUrl + this.deliveryModesUrl;
    return this.http.get<DeliveryModesResponse>(url);
  }
}
