import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Branch } from "../models/branch";
import { Pagination } from "../models/pagination";

@Injectable({
  providedIn: "root"
})
export class BranchService {
  unidades = new FormControl();
  httpClient: any;

  constructor(private http: HttpClient) {}

  search(query): Observable<Pagination<Branch>> {
    const params = Object.keys(query)
      .filter(key => {
        return query[key].toString().length > 0;
      })
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");

    return this.http.get<Pagination<Branch>>(
      `${environment.api.url}/api/v1/branches?${params}`
    );
  }

  register(data): Observable<Branch> {
    return this.http.post<Branch>(
      `${environment.api.url}/api/v1/branches`,
      data,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }
    );
  }

  getAll(query): Observable<Branch[]> {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");
    return this.http.get<Branch[]>(
      `${environment.api.url}/api/branches/all/${params}`
    );
  }
}
