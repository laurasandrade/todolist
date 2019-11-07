import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConsolidadoService {
  constructor(private http: HttpClient) {}

  get(query: any) {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");

    let url = `${environment.api.url}/api/v1/reports/consolidated?${params}`;
    console.log("url", url);
    return this.http.get(url);
  }
  getPdf(query: any): Observable<Blob> {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");
    const url = `${environment.api.url}/api/v1/reports/pdf/consolidated?${params}`;

    return this.http.get(url, { responseType: "blob" });
  }
}
