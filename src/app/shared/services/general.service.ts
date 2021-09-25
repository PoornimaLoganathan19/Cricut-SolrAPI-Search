import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { RefreshTokenResponse } from "../models/refreshTokenResponse";
@Injectable({
  providedIn: "root"
})
export class GeneralService {
  private apiUrl: string = environment.apiUrl;
  private tokenUrl: string = environment.tokenUrl;
  private refreshTokenUrl: string = environment.refreshTokenUrl;
  constructor(private http: HttpClient) {}

  refreshToken(): Observable<RefreshTokenResponse> {
    const url = this.apiUrl + this.tokenUrl + this.refreshTokenUrl;
    const body = {
      username: localStorage.getItem("userId")
    };
    return this.http.post<RefreshTokenResponse>(url, body);
  }
}
