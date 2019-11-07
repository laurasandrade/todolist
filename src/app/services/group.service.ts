import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { User } from "../models/user";
import { Group } from "../models/group";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  constructor(private http: HttpClient) {}
  getAll(query: any): Observable<any> {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");

    return this.http.get<any>(
      `${environment.api.url}/api/v1/groups/all?${params}`
    );
  }
}
