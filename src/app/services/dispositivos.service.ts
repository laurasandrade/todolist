import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../environments/environment';
import { Pagination } from '../models/pagination';
import { Device } from '../models/device';

@Injectable()
export class DispositivosService {
  findAll(offset: number, limit: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  search(offset, limit, terms: string): Observable<Pagination<Device>> {
    return this.searchEntries(offset, limit, terms);
  }

  searchEntries(offset, limit, term) {
    let query = `?limit=${limit}&offset=${offset}`;

    if (term) {
      query += `&device=${term}`;
    }
    return this.http
      .get<Pagination<Device>>(`${environment.api.url}/api/v1/devices${query}`)
  }

}
