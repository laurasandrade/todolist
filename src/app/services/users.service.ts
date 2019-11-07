import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { Pagination } from "../models/pagination";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(query: any): Observable<User[]> {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");

    return this.http.get<User[]>(
      `${environment.api.url}/api/users/all/${params}`
    );
  }

  register(data): Observable<any> {
    return this.http
      .post<User>(`${environment.api.url}/api/v1/users`, data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }
  search(query): Observable<Pagination<User>> {
    const params = Object.keys(query)
      .filter(key => {
        return query[key].toString().length > 0;
      })
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");

    return this.http.get<Pagination<User>>(
      `${environment.api.url}/api/v1/users?${params}`
    );
  }
}
