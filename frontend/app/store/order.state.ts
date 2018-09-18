import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Order } from '../order-list/order-list.interfaces';
import { LoadOrders, LoadMoreOrders, LoadOrdersLoading } from './order.actions';
import { OrderListService } from '../order-list/order-list.service';

export class OrderListStateModel {
  loading: boolean;
  error: Error | null;
  page: number;
  totalPages: number;
  orders: Order[];
}

@State<OrderListStateModel>({
  name: 'orderList',
  defaults: {
    loading: true,
    error: null,
    page: 1,
    totalPages: 1,
    orders: []
  }
})
export class OrderListState {
  constructor(private orderListService: OrderListService) {}

  @Selector()
  static getOrders(state: OrderListStateModel): Order[] {
    return state.orders;
  }

  @Selector()
  static isLoading(state: OrderListStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static isLastPage(state: OrderListStateModel): boolean {
    return (state.totalPages === state.page);
  }

  @Action(LoadOrders)
  loadOrders({ setState, getState, dispatch }: StateContext<OrderListStateModel>, { page }: LoadOrders) {
    // Set loading state.
    dispatch(new LoadOrdersLoading());

    const state = getState();
    return this.orderListService.getPage(page).pipe(tap((result) => {
      setState({
        loading: false,
        error: null,
        page: result.page,
        totalPages: Math.ceil(result.total / result.pageSize),
        orders: [
          ...state.orders,
          ...result.items
        ]
      });
    }));
  }

  @Action(LoadMoreOrders)
  loadMoreOrders({ dispatch, getState }: StateContext<OrderListStateModel>) {
    const state = getState();
    dispatch(new LoadOrders(state.page + 1));
  }

  @Action(LoadOrdersLoading)
  loadOrdersLoading({ patchState }: StateContext<OrderListStateModel>) {
    patchState({
      loading: true,
      error: null
    });
  }
}
