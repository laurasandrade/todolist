import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpParams,
  HttpClient,
  HttpResponse
} from "@angular/common/http";
import { tap } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Token } from "../models/token";
import { User } from "../models/user";

@Injectable()
export class AuthService {
  private ACCESS_TOKEN = "QUNDRVNTX1RPS0VO";
  private REFRESH_TOKEN = "UkVGUkVTSF9UT0tFTg==";

  constructor(private http: HttpClient) {}

  authenticate(email, password): Observable<Token> {
    return this.http
      .post(
        `${environment.api.url}/token`,
        new HttpParams()
          .set("grant_type", "password")
          .set("username", email)
          .set("password", password),
        {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic YmFja29mZmljZTokMmIkMTIkR0N6NUlOWE0uRldPSlRtU2Q1bGZtZXpzSWxlemZ2L29xWjF6Z3dkY3QzSC80Nk4uWFY2NVM="
          })
        }
      )
      .pipe(
        tap((event: Token) => {
          localStorage.setItem(this.ACCESS_TOKEN, event.access_token);
          localStorage.setItem(this.REFRESH_TOKEN, event.refresh_token);
        })
      );
  }

  reAuthenticate(): Observable<Token> {
    return this.http
      .post(
        `${environment.api.url}/token`,
        new HttpParams()
          .set("grant_type", "refresh_token")
          .set("refresh_token", this.refreshToken),
        {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic YmFja29mZmljZTokMmIkMTIkR0N6NUlOWE0uRldPSlRtU2Q1bGZtZXpzSWxlemZ2L29xWjF6Z3dkY3QzSC80Nk4uWFY2NVM="
          })
        }
      )
      .pipe(
        tap((event: Token) => {
          localStorage.setItem(this.ACCESS_TOKEN, event.access_token);
          localStorage.setItem(this.REFRESH_TOKEN, event.refresh_token);
        })
      );
  }

  clear() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  get accessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  get refreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  get user(): any {
    try {
      const token = localStorage.getItem(this.ACCESS_TOKEN);
      const user = jwt_decode<User>(token);
      user.hasPermission = function(scope) {
        return this.scopes.includes(scope);
      };

      return user;
    } catch (error) {
      return {
        name: "",
        branches: [],
        group: "",
        scopes: [],
        isAdmin: false
      };
    }
  }
}
