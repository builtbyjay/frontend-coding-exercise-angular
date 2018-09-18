import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';

import { OrderListResponse } from './order-list.interfaces';

@Injectable()
export class OrderListService {
  private url = 'http://localhost:4300/orders';

  constructor(private http: HttpClient) { }

  public getPage(page: number = 1): Observable<OrderListResponse> {
    return this.http.get<OrderListResponse>(`${this.url}?page=${page}`).pipe(
      delay(500)
    );
  }
}
