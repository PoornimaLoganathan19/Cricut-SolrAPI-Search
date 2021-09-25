import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GeneralService } from "../services/general.service";
import { RefreshTokenResponse } from "../models/refreshTokenResponse";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiUrl: string = environment.apiUrl;
  private userUrl: string = environment.userUrl;
  private cartUrl: string = environment.cartUrl;
  private authenticateUrl: string = environment.authenticateUrl;
  private orderUrl: string = environment.orderUrl;
  private logoutUrl: string = environment.logoutUrl;
  private tokenUrl: string = environment.tokenUrl;
  private refreshTokenUrl: string = environment.refreshTokenUrl;
  private refreshTokenResponse: RefreshTokenResponse;
  constructor(private generalService: GeneralService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem("token");
    let authReq = request;
    if (request.method == "POST") {
      authReq = request.clone({
        setHeaders: { "Content-Type": "application/json" }
      });
      if (request.url == this.apiUrl + this.tokenUrl + this.refreshTokenUrl)
        authReq = authReq.clone({
          setHeaders: { oldToken: localStorage.getItem("token") }
        });
    }

    if (
      request.url.startsWith(this.apiUrl + this.userUrl) ||
      request.url.startsWith(this.apiUrl + this.cartUrl) ||
      request.url.startsWith(this.apiUrl + this.orderUrl)
    ) {
      if (
        request.url !== this.apiUrl + this.userUrl &&
        request.url !== this.apiUrl + this.userUrl + this.authenticateUrl
      ) {
        authReq = authReq.clone({
          setHeaders: {
            Authorization: "Bearer " + authToken,
            userId: localStorage.getItem("userId")
          }
        });
        if (request.url === this.apiUrl + this.userUrl + this.logoutUrl)
          authReq = authReq.clone({
            setHeaders: { token: authToken }
          });
      }
    }
    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(event);
          if (event.headers.get("errorCode") == "003") {
            console.log("error");
            this.generalService.refreshToken().subscribe(data => {
              this.refreshTokenResponse = data;
              console.log(this.refreshTokenResponse);
              localStorage.setItem("token", this.refreshTokenResponse.token);
              window.location.reload();
            });
          }
        }
      })
    );
  }
}
