import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CardResponse } from "../models/cardResponse";
import { AddressResponse } from "../models/addressResponse";
import { UserResponse } from "../models/userResponse";
import { SimpleResponse } from "../models/simpleResponse";
import { AddressListResponse } from "../models/addressListResponse";
import { CardListResponse } from "../models/cardListResponse";
import { LoginResponse } from "../models/loginResponse";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl: string = environment.apiUrl;
  private userUrl: string = environment.userUrl;
  private authenticateUrl: string = environment.authenticateUrl;
  private logoutUrl: string = environment.logoutUrl;
  private creditCardsUrl: string = environment.creditCardsUrl;
  private creditcardUrl: string = environment.creditcardUrl;
  private addressUrl: string = environment.addressUrl;
  private addressesUrl: string = environment.addressesUrl;
  constructor(private http: HttpClient) {}

  register(
    firstName: string,
    lastName: string,
    userId: string,
    phoneNumber: string,
    password: string
  ): Observable<UserResponse> {
    let body = { firstName, lastName, userId, phoneNumber, password };
    const url = this.apiUrl + this.userUrl;
    return this.http.post<UserResponse>(url, body);
  }

  login(userId: string, password: string): Observable<LoginResponse> {
    let body = { userId, password };
    const url = this.apiUrl + this.userUrl + this.authenticateUrl;
    return this.http.post<LoginResponse>(url, body);
  }

  logout(): Observable<SimpleResponse> {
    const url = this.apiUrl + this.userUrl + this.logoutUrl;
    return this.http.get<SimpleResponse>(url);
  }

  addCard(
    cardNumber: string,
    expiryMonth: number,
    expiryYear: number,
    cvv: string,
    firstName: string,
    lastName: string
  ): Observable<CardResponse> {
    const body = {
      cardNumber,
      cardType: "MASTERCARD",
      expiryMonth,
      expiryYear,
      cvv,
      firstName,
      lastName
    };
    let url = this.apiUrl + this.userUrl + this.creditcardUrl;
    return this.http.post<CardResponse>(url, body);
  }
  addAddress(
    firstName: string,
    lastName: string,
    line1: string,
    line2: string,
    town: string,
    postalCode: string,
    stateId: string,
    countryId: string
  ): Observable<AddressResponse> {
    const body = {
      firstName,
      lastName,
      line1,
      line2,
      town,
      postalCode,
      state: { stateId },
      country: { countryId },
      defaultAddress: true,
      addressType: "SHIPPING"
    };
    let url = this.apiUrl + this.userUrl + this.addressUrl;
    return this.http.post<AddressResponse>(url, body);
  }

  getAddressList(): Observable<AddressListResponse> {
    let url = this.apiUrl + this.userUrl + this.addressesUrl;
    return this.http.get<AddressListResponse>(url);
  }

  getCardList(): Observable<CardListResponse> {
    let url = this.apiUrl + this.userUrl + this.creditCardsUrl;
    return this.http.get<CardListResponse>(url);
  }
}
