import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as data from '../store/dummy-data.json';
import { Order, OrderListResponse } from './order-list.interfaces';
import { OrderListComponent } from './order-list.component';
import { LoadOrders } from '../store/order.actions';

@Component({
  selector: 'app-order-list-item',
  template: ''
})
class TestOrderListItemComponent {
  @Input() public order: Order;
}

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderListComponent,
        TestOrderListItemComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['dispatch'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    /**
     * I wasn't happy using the real Store in my component tests and
     * documentation for how to mock an ngxs 2.0 Store is a bit lacking.
     * I decided to follow the advice on this issue to allow my observable
     * component properties linked to the Store to be mocked.
     * https://github.com/ngxs/store/issues/482
     */
    Object.defineProperty(component, 'isLoading$', { writable: true });
    component.isLoading$ = Observable.of(false);
    Object.defineProperty(component, 'orders$', { writable: true });
    component.orders$ = Observable.of([]);
    Object.defineProperty(component, 'isLastPage$', { writable: true });
    component.isLastPage$ = Observable.of(false);

    store = TestBed.get(Store);
    fixture.detectChanges();
  });


  it('should dispatch LoadOrders action OnInit', () => {
    expect(store.dispatch)
      .toHaveBeenCalledWith(new LoadOrders(1));
  });

  describe('Order List Items', () => {
    let orders: Order[];
    let children: TestOrderListItemComponent[];

    beforeEach(() => {
      orders = (<any>data).items;
      component.orders$ = Observable.of(orders);
      fixture.detectChanges();
      children = fixture
        .debugElement.queryAll(By.css('app-order-list-item'))
        .map(debugElement => debugElement.componentInstance);
    });

    it('should display an order-list-item component for each order', () => {
      expect(children.length).toEqual(2);
    });

    it('should set order Input binding correctly', () => {
      expect(children[0].order).toEqual(orders[0]);
      expect(children[1].order).toEqual(orders[1]);
    });
  });

  describe('Load More Button', () => {
    let btn: HTMLElement;

    beforeEach(() => {
      btn = fixture.nativeElement.querySelector('#btn-load-more');
    });

    it('should display when isLastPage$ is false', () => {
      expect(btn).toBeTruthy();
    });

    it('should apply has-spinner class when isLoading$ changes', () => {
      component.isLoading$ = Observable.of(true);
      fixture.detectChanges();
      expect(btn.classList.contains('has-spinner')).toBe(true);
      component.isLoading$ = Observable.of(false);
      fixture.detectChanges();
      expect(btn.classList.contains('has-spinner')).toBe(false);
    });

    it('should call loadMore when clicked', () => {
      spyOn(component, 'loadMore');
      btn.dispatchEvent(new Event('click'));
      expect(component.loadMore).toHaveBeenCalled();
    });

    it('should not display when isLastPage$ is true', () => {
      component.isLastPage$ = Observable.of(true);
      fixture.detectChanges();
      btn = fixture.nativeElement.querySelector('#btn-load-more');
      expect(btn).toBeFalsy();
    });
  });
});
