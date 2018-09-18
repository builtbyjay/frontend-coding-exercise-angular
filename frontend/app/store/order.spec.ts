import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Order } from '../order-list/order-list.interfaces';
import { OrderListState } from './order.state';
import { LoadOrders, LoadMoreOrders, LoadOrdersLoading } from './order.actions';
import { OrderListService } from '../order-list/order-list.service';
import * as data from './dummy-data.json';

describe('OrderListState', () => {
  let store: Store;
  let service: OrderListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([OrderListState])
      ],
      providers: [
        {
          provide: OrderListService,
          useValue: {
            getPage: () => {}
          }
        }
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    service = TestBed.get(OrderListService);
    spyOn(service, 'getPage').and.returnValue(Observable.of(data));
  }));

  describe('LoadOrders', () => {
    it('dispatches LoadOrdersLoading action', async(() => {
      spyOn(store, 'dispatch').and.callThrough();
      store.dispatch(new LoadOrders());
      expect(store.dispatch)
        .toHaveBeenCalledWith(new LoadOrdersLoading());
    }));

    it('calls orderListService with correct page number', async(() => {
      store.dispatch(new LoadOrders(7));
      expect(service.getPage).toHaveBeenCalledWith(7);
    }));

    it('sets state when orderListService emits', async(() => {
      store.dispatch(new LoadOrders());
      store.selectOnce(state => state.orderList).subscribe(state => {
        expect(state.loading).toEqual(false);
        expect(state.error).toBeNull();
        expect(state.page).toEqual((<any>data).page);
        expect(state.totalPages).toEqual(2);
        expect(state.orders.length).toEqual((<any>data).items.length);
      });
    }));

    it('adds new orders to array', async(() => {
      store.dispatch(new LoadOrders());
      store.dispatch(new LoadOrders());
      store.selectOnce(state => state.orderList).subscribe(state => {
        expect(state.orders.length).toEqual((<any>data).items.length * 2);
      });
    }));
  });

  describe('LoadMoreOrders', () => {
    it('it calls LoadOrders with next page number', async(() => {
      spyOn(store, 'dispatch').and.callThrough();
      store.dispatch(new LoadMoreOrders());
      expect(store.dispatch).toHaveBeenCalledWith(new LoadOrders(2));
    }));
  });

  describe('LoadOrdersLoading', () => {
    it('it sets loading to true', async(() => {
      store.dispatch(new LoadOrdersLoading());
      store.selectOnce(state => state.orderList).subscribe(state => {
        expect(state.loading).toBe(true);
      });
    }));

    it('it sets error to null', async(() => {
      store.dispatch(new LoadOrdersLoading());
      store.selectOnce(state => state.orderList).subscribe(state => {
        expect(state.error).toBeNull();
      });
    }));
  });

  describe('Selectors', () => {
    /**
     * I'd look to manually set the state in each test before the assertions, so
     * that the selectors' unit tests could cover all possible states.
     */
    describe('getOrders selector', () => {
      it('should return orders', async(() => {
        store.selectOnce(OrderListState.getOrders).subscribe((orders: Order[]) => {
          expect(orders).toEqual([]);
        });
      }));
    });

    describe('isLoading selector', () => {
      it('should return loading property', async(() => {
        store.selectOnce(OrderListState.isLoading).subscribe((isLoading: boolean) => {
          expect(isLoading).toBe(true);
        });
      }));
    });

    describe('isLastPage selector', () => {
      it('should return loading property', async(() => {
        store.selectOnce(OrderListState.isLastPage).subscribe((isLastPage: boolean) => {
          expect(isLastPage).toBe(true);
        });
      }));
    });
  });
});
