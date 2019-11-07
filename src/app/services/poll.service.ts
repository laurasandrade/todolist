import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";

import { environment } from "../../environments/environment";
import { Pagination } from "../models/pagination";
import { Poll } from "../models/poll";

@Injectable()
export class PollService {
  constructor(private http: HttpClient) {}

  findAll(offset: number, limit: number) {
    let query = `?${limit}&active=true&offset=${offset}`;

    return this.http.get<Pagination<Poll>>(
      `${environment.api.url}/api/v1/polls/all${query}`
    );
  }

  byBranch(branch: string): Observable<{ total: number; items: [] }> {
    return this.http.get<{ total: number; items: [] }>(
      `${environment.api.url}/api/v1/polls/by-branch/${branch}`
    );
  }

  search(offset, limit, termSearch: string): Observable<Pagination<Poll>> {
    return this.searchEntries(offset, limit, termSearch);
  }

  searchEntries(offset, limit, term) {
    let query = `?limit=${limit}&offset=${offset}`;

    if (term) {
      query += `&name=${term}`;
    }

    return this.http.get<Pagination<Poll>>(
      `${environment.api.url}/api/v1/polls${query}`
    );
  }
}
