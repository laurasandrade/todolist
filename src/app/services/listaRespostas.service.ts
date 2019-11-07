import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { ObjetoRaiz } from "../models/comboRespostas";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

// tslint:disable-next-line:class-name
export class ListaRespostasService {
  // rows: any;

  httpOptions: any = {};

  constructor(private http: HttpClient) {}

  get(query: any) {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");
    let url = `${environment.api.url}/api/v1/reports/answersList?${params}`;
    return this.http.get(url);
  }
  getCsv(query: any): Observable<Blob> {
    const params = Object.keys(query)
      .map(key => {
        return [key, query[key]].join("=");
      })
      .join("&");
    const url = `${
      environment.api.url
    }/api/v1/reports/csv/answers-list?${params}`;

    return this.http.get(url, { responseType: "blob" });
  }
  getRespostas({
    branch = "",
    startDate = "",
    endDate = "",
    startTime = "",
    endTime = "",
    startByShift = "",
    endByShift = "",
    daysOfWeek = ""
  }: {
    branch?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    startByShift?: string;
    endByShift?: string;
    daysOfWeek?: string;
  } = {}): Observable<ObjetoRaiz> {
    let query = `?branch=${branch}`;

    if (startDate) {
      query += `&startDate=${startDate}`;
    }
    if (endDate) {
      query += `&endDate=${endDate}`;
    }
    if (startTime) {
      query += `&startTime=${startTime}`;
    }
    if (endTime) {
      query += `&endTime=${endTime}`;
    }
    if (startByShift) {
      query += `&startByShift=${startByShift}`;
    }
    if (endByShift) {
      query += `&endByShift=${endByShift}`;
    }
    if (daysOfWeek) {
      query += `&daysOfWeek=${daysOfWeek}`;
    }

    return this.http.get<ObjetoRaiz>(
      `${environment.api.url}/api/v1/reports/answersList${query}`
    );
  }
}
