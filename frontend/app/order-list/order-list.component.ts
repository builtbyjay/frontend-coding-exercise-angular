import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Select } from '@ngxs/store';

import { LoadOrders, LoadMoreOrders } from '../store/order.actions';
import { Order } from './order-list.interfaces';
import { OrderListState } from '../store/order.state';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Select(OrderListState.isLoading) public isLoading$: Observable<boolean>;
  @Select(OrderListState.getOrders) public orders$: Observable<Order[]>;
  @Select(OrderListState.isLastPage) public isLastPage$: Observable<boolean>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new LoadOrders(1));
  }

  public loadMore(): void {
    this.store.dispatch(new LoadMoreOrders());
  }
}
