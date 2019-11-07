import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ResearchByHourService {
  httpOptions: any = {};
  constructor(private http: HttpClient) {}

  get(query: any): Observable<any> {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");
    const url = `${environment.api.url}/api/v1/reports/research-by-hour?${params}`;
    return this.http.get(url);
  }

  getPdf(query: any): Observable<Blob> {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");
    const url = `${environment.api.url}/api/v1/reports/pdf/research-by-hour?${params}`;

    return this.http.get(url, { responseType: "blob" });
  }
}
